"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "sadasdasjgdvajdvasjdv";
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
};
exports.createToken = createToken;
