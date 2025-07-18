"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("@auth/generateToken");
class UserController {
    register = async (req, res, next) => {
        try {
            const { username, password, email } = req.body;
            const saltRounds = await bcryptjs_1.default.genSalt(10);
            const hash = await bcryptjs_1.default.hash(password, parseInt(saltRounds));
            const nuevoUsuario = await prisma_1.prisma.users.create({
                data: { username, password: hash, email },
            });
            return res.status(201).json(nuevoUsuario);
        }
        catch (e) {
            next(e);
            console.log(e);
        }
    };
    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await prisma_1.prisma.users.findFirst({
                where: { username },
            });
            if (!user) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }
            const isMatch = true;
            if (isMatch) {
                const token = (0, generateToken_1.createToken)(req.body);
                return res
                    .status(200)
                    .json({ message: `Bienvenido ${user.username}`, token: token });
            }
            else {
                return res
                    .status(401)
                    .json({ message: "Credenciales incorrectas, NO AUTORIZADO" });
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error del servidor" });
        }
    };
}
exports.default = UserController;
