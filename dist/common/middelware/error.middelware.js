"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_service_1 = require("../../config/env.service");
const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack = env_service_1.mode === 'dev' ? err.stack : undefined,
        cause: err.cause || undefined
    });
};
exports.globalErrorHandler = globalErrorHandler;
