"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFondError_1 = __importDefault(require("../../utils/NotFondError"));
const notFoundHandler = (req, res, next) => {
    next(new NotFondError_1.default(`La ruta ${req.host + req.originalUrl} no existe`));
};
exports.default = notFoundHandler;
