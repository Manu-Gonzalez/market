"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const express_1 = __importDefault(require("express"));
const bodyJsonMiddleware_1 = require("../shared/utils/bodyJsonMiddleware");
const userSchemas_1 = __importDefault(require("./userSchemas"));
const userRoutes = express_1.default.Router();
const controller = new controller_1.default();
userRoutes.post('/register', (0, bodyJsonMiddleware_1.bodyValidator)(userSchemas_1.default.userBodySchema), controller.register);
userRoutes.post('/login', (0, bodyJsonMiddleware_1.bodyValidator)(userSchemas_1.default.userLoginSchema), controller.login);
exports.default = userRoutes;
