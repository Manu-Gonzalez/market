"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    let token;
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
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
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access Token expirado" });
        }
        return res.status(403).json({ message: "Token inválido" });
    }
};
exports.verifyToken = verifyToken;
