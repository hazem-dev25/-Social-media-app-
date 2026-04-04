"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const reseponce_1 = require("../utils/reseponce");
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
            throw (0, reseponce_1.BadRequest)({ message: "validation error" });
        }
        next();
    };
};
exports.validation = validation;
