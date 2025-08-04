import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET!;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
    console.log(req.cookies.accessToken);
  }
  else if (req.headers.authorization) {
    const [type, value] = req.headers.authorization.split(" ");
    if (type !== "Bearer" || !value) {
      return res.status(400).json({
        message: "Formato incorrecto, debe ser: Authorization: Bearer MiToken1234",
      });
    }
    token = value;
  }
  // Si no hay token en ninguno de los dos
  if (!token) {
    return res.status(401).json({ message: "Token no encontrado" });
  }

  // Verificar JWT
  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access Token expirado" });
    }
    return res.status(403).json({ message: "Token inválido" });
  }
};
