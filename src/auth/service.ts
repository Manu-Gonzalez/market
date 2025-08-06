import { prisma } from "@config/prisma" ;
import bcrypt from "bcryptjs" ;
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyHashedToken,
  getRefreshExpiryDate,
  shouldRotate
} from "@utils/tokens";

const REFRESH_LIFETIME = 1000 * 60 * 60 * 24 * 7; 

export async function login(email: string, password: string, device: string, ip?: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Credenciales inválidas");

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = await hashToken(refreshToken);

  await prisma.session.create({
    data: {
      userId: user.id,
      device,
      ip,
      refreshTokenHash,
      expiresAt: getRefreshExpiryDate(),
    }
  });
  return { accessToken, refreshToken };
}

export async function refreshSession(providedRefreshToken: string, device: string) {
  const sessions = await prisma.session.findMany({
    where: { device, isValid: true },
    include: { user: true }
  });

  let validSession = null;
  for (const session of sessions) {
    const match = await verifyHashedToken(providedRefreshToken, session.refreshTokenHash);
    if (match && session.expiresAt > new Date()) {
      validSession = session;
      break;
    }
  }

  if (!validSession) throw new Error("Refresh token inválido");

  // Generar nuevo access token
  const newAccessToken = generateAccessToken({ userId: validSession.user.id });

  // Rotación anticipada
  let refreshTokenToReturn = providedRefreshToken;
  if (shouldRotate(validSession.expiresAt)) {
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = await hashToken(newRefreshToken);

    await prisma.session.update({
      where: { id: validSession.id },
      data: {
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: getRefreshExpiryDate()
      }
    });

    refreshTokenToReturn = newRefreshToken;
  }

  return { accessToken: newAccessToken, refreshToken: refreshTokenToReturn };
}

export async function logout(providedRefreshToken: string) {
  const sessions = await prisma.session.findMany({ where: { isValid: true } });

  for (const session of sessions) {
    const match = await verifyHashedToken(providedRefreshToken, session.refreshTokenHash);
    if (match) {
      await prisma.session.update({
        where: { id: session.id },
        data: { isValid: false }
      });
      return;
    }
  }

  throw new Error("Sesión no encontrada");
}
