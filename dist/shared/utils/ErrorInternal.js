"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorInternal extends Error {
    contructor(message, statusCode) {
        super(message, String);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.contructor);
    }
}
exports.default = ErrorInternal;
