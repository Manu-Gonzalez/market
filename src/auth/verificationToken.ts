import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken') ;

const secretKey = process.env.JWT_SECRET || "mi_clave_super_secreta";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no encontrado" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(400).json({
      message:
        "Formato incorrecto, el header debe ser: Authorization: Bearer MiToken1234",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

