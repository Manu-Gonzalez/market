"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsValidator = void 0;
const paramsValidator = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
    }
    next();
};
exports.paramsValidator = paramsValidator;
