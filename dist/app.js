"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./products/routes"));
const routes_2 = __importDefault(require("./users/routes"));
const verificationToken_1 = require("./auth/verificationToken");
const errorHandler_1 = __importDefault(require("./shared/middlewares/errorHandlers/errorHandler"));
const notFoundMiddleware_1 = __importDefault(require("./shared/middlewares/errorHandlers/notFoundMiddleware"));
const refreshToken_1 = require("./auth/refreshToken");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use("/", routes_2.default);
app.use(verificationToken_1.verifyToken);
app.use(refreshToken_1.refreshToken);
app.use("/products", routes_1.default);
app.use(notFoundMiddleware_1.default);
app.use(errorHandler_1.default);
exports.default = app;
