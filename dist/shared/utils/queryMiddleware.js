"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidator = void 0;
const queryValidator = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
    }
    next();
};
exports.queryValidator = queryValidator;
