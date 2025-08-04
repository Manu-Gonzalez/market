import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@config/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token no encontrado" });
  }

  try {
    // Verificar si el Refresh Token es válido
    const decoded: any = jwt.verify(refreshToken, REFRESH_SECRET);

    // Confirmar que el Refresh Token existe en la base de datos
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(403).json({ message: "Refresh Token inválido o expirado" });
    }

    // Generar nuevo Access Token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // (Opcional) Rotar Refresh Token
    const newRefreshToken = jwt.sign({ id: decoded.id }, REFRESH_SECRET, { expiresIn: "7d" });

    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({ message: "Token renovado" });
  } catch (err) {
    return res.status(403).json({ message: "Refresh Token inválido" });
  }
};
