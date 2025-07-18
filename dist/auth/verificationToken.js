"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token?.split(' ')[0] != 'Bearer')
        return res.status(400).json({
            message: "Error al ingresar el token, se debe ingresar en el siguiente formato: Authorization Bearer MiToken1234",
        });
    if (!token)
        return res.status(401).json({ message: "Token no encontrado" });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Token inválido" });
    }
};
exports.verifyToken = verifyToken;
