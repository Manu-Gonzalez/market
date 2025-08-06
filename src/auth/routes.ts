import { Router } from "express";
import AuthController from "./controller";
import  express  from 'express';

const authRoutes = express.Router();
const controller = new AuthController();

authRoutes.post("/login", controller.login);
authRoutes.post("/logout", controller.logout);

export default authRoutes;
