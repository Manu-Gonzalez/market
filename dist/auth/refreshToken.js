"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token no encontrado" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        const storedToken = await prisma_1.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });
        if (!storedToken || storedToken.expiresAt < new Date()) {
            return res.status(403).json({ message: "Refresh Token inválido o expirado" });
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "15m" });
        const newRefreshToken = jsonwebtoken_1.default.sign({ id: decoded.id }, REFRESH_SECRET, { expiresIn: "7d" });
        await prisma_1.prisma.refreshToken.update({
            where: { token: refreshToken },
            data: {
                token: newRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 15,
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return res.status(200).json({ message: "Token renovado" });
    }
    catch (err) {
        return res.status(403).json({ message: "Refresh Token inválido" });
    }
};
exports.refreshToken = refreshToken;
