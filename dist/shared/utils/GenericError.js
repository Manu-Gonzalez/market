"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = GenericError;
