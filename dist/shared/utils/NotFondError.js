"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericError_1 = __importDefault(require("./GenericError"));
class NotFoundError extends GenericError_1.default {
    constructor(message = "Página no encontrada") {
        super(message, 404);
    }
}
exports.default = NotFoundError;
