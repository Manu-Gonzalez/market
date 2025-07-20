import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import GenericError from "src/shared/utils/GenericError";

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta"; // Usa .env

interface Payload {
  id: number;
  username: string;
  email: string;
}

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => void;

export default class UserController {
  public register: ControllerFunction = async (req, res, next)  => {
    try {
      const { username, password, email }: { username: string; password: string; email: string } = req.body;

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
      const { username, password }: { username: string; password: string } = req.body;

      const user = await prisma.users.findFirst({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      if (!user.password) {
        return res.status(500).json({ message: "El usuario no tiene contraseña registrada" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      const payload: Payload = {
        id: user.id,
        username: user.username ?? "",
        email: user.email ?? "",
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({
        message: `Bienvenido ${user.username}`,
        token,
      });
    } catch (e) {
      console.error(e);
      next(e)
    }
  };
};


