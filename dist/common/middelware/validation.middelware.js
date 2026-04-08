"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => {
    let validationError = [];
    return (req, res, next) => {
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const value = schema[key].safeParse(req[key]);
            if (!value.success) {
                validationError.push({ key, issue: value.error.issues });
            }
        }
        if (validationError.length > 0) {
            res.status(400).json({ message: 'validation error', errors: validationError });
            return;
        }
        next();
    };
};
exports.validation = validation;
