"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
const controller = new controller_1.default;
userRoutes.post('/register', controller.register);
userRoutes.post('/login', controller.login);
userRoutes.delete('/logout', controller.logout);
exports.default = userRoutes;
