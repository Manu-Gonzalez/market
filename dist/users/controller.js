"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
class UserController {
    register = async (req, res, next) => {
        try {
            const { username, password, email } = req.body;
            const salt = await bcryptjs_1.default.genSalt(10);
            const hash = await bcryptjs_1.default.hash(password, salt);
            const newUser = await prisma_1.prisma.users.create({
                data: { username, password: hash, email },
                select: { id: true, username: true, email: true },
            });
            return res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en el registro" });
        }
    };
    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await prisma_1.prisma.users.findFirst({ where: { username } });
            if (!user || !user.password) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(401).json({ message: "Credenciales incorrectas" });
            const payload = {
                id: user.id,
                username: user.username ?? "",
                email: user.email ?? "",
            };
            if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
                throw new Error("JWT_SECRET o REFRESH_SECRET no están definidos");
            }
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await prisma_1.prisma.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt,
                },
            });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 15,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            return res.status(200).json({
                message: `Bienvenido ${user.username}`,
                token: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (e) {
            console.error(e);
            next(e);
        }
    };
    logout = async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({ message: "Sesión cerrada" });
        }
        try {
            await prisma_1.prisma.refreshToken.delete({
                where: { token: refreshToken },
            });
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({ message: "Sesión cerrada correctamente" });
        }
        catch (error) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({ message: "Sesión cerrada" });
        }
    };
}
exports.default = UserController;
