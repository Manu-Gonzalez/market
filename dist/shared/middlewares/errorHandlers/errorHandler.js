"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericError_1 = __importDefault(require("../../utils/GenericError"));
const errorHandler = (err, req, res, next) => {
    const time = Date.now();
    if (err instanceof GenericError_1.default) {
        return res.status(err.statusCode).json({
            message: err.message,
            host: req.host,
            url: req.originalUrl,
            method: req.method,
            statusCode: err.statusCode,
            time: time,
        });
    }
    return res.status(500).json({
        message: "Error interno del servidor",
        host: req.host,
        url: req.originalUrl,
        method: req.method,
        statusCode: 500,
        time: time,
    });
};
exports.default = errorHandler;
