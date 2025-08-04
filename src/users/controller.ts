import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ;
const REFRESH_SECRET = process.env.REFRESH_SECRET ;

// Interfaces para los tokens
interface Payload {
  id: number;
  username: string;
  email: string;
}

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => void;

export default class UserController {
  public register: ControllerFunction = async (req, res, next) => {
    try {
      const { username, password, email } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await prisma.users.create({
        data: { username, password: hash, email },
        select: { id: true, username: true, email: true },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el registro" });
    }
  };

  public login: ControllerFunction = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // Buscar usuario
      const user = await prisma.users.findFirst({ where: { username } });
      if (!user || !user.password) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      // Validar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Credenciales incorrectas" });

      // Crear payload para el Access Token
      const payload: Payload = {
        id: user.id,
        username: user.username ?? "",
        email: user.email ?? "",
      };

      // Generar Access Token (expira rápido)
      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

      // Generar Refresh Token (expira en 7 días)
      const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

      // Guardar Refresh Token en la base de datos
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      // Configurar cookies seguras
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15 minutos
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(200).json({ message: `Bienvenido ${user.username}` });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
}
