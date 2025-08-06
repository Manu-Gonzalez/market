import UsuarioController from "./controller";
import express from 'express';
import { authMiddlewareJWT } from "@auth/middleware";


const userRoutes = express.Router();
const controller = new UsuarioController();


userRoutes.post("/register", controller.register);

userRoutes.get("/", authMiddlewareJWT,controller.getAll);

export default userRoutes;
