import { verifyAccessToken } from "@utils/tokens";
import GenericError from "@utils/GenericError";
import { ExpressFunction } from "src/shared/types/ExpressFunctionType";

export const authMiddlewareJWT: ExpressFunction = (req, res, next) => {
  const headerAuth = req.headers.authorization?.split(" ");

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
  } catch {
    return next(new GenericError("Token inválido o expirado", 403));
  }
}
