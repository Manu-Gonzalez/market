"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jwt = require('jsonwebtoken');
const createToken = (payload) => (req, res, next) => {
    try {
        const { username, password } = req.body;
        const payload = {
            username: username,
            password: password,
        };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    }
    catch (e) {
        next(e);
        console.log();
    }
};
exports.createToken = createToken;
