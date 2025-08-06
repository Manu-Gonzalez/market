import { verifyAccessToken } from "@utils/tokens";
import GenericError from "@utils/GenericError";
import { ExpressAsyncFunction } from "src/shared/types/ExpressFunctionType";
import { refreshSession } from "./service";


export const authMiddlewareJWT: ExpressAsyncFunction = async (req, res, next) => {
  const headerAuth = req.headers.authorization?.split(" ");
  const refreshTokensSession = req.cookies?.refreshToken;

  if (!refreshTokensSession) {
    return next(new GenericError("Refresh token no proporcionado", 401));
  }

  if(!headerAuth) {
    return next(new GenericError("Autorizacion requerida, esquema de autorizacion y token", 401));
  }else if (headerAuth[0] !== "Bearer") {
    return next(new GenericError("Formato de token inválido ingrese el token en el siguiente formato -> Bearer MiToken", 400));
  }else if (headerAuth.length !== 2) {
    return next(new GenericError("Token requerido", 401));
  }
  
  const token = headerAuth[1];

  try {
    const payload = verifyAccessToken(token) ;
    (req as any).user = payload;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshSession(refreshTokensSession, req.headers["user-agent"] as string);
      res
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({ newAccessToken });
    }
    return next(new GenericError("Token inválido o expirado", 403));
  }
}
