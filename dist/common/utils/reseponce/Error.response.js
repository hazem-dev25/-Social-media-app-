"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.unauthorized = exports.forbidden = exports.Conflict = exports.NotFound = exports.BadRequest = exports.ErrorResponse = void 0;
const env_service_1 = require("../../../config/env.service");
const ErrorResponse = ({ message = "Error", status = 400, extra = undefined } = {}) => {
    throw new Error(message, { cause: { status, extra } });
};
exports.ErrorResponse = ErrorResponse;
const BadRequest = ({ message = "Bad Request", extra = undefined } = {}) => {
    return (0, exports.ErrorResponse)({ message, status: 400, extra });
};
exports.BadRequest = BadRequest;
const NotFound = ({ message = "Not Found", extra = undefined } = {}) => {
    return (0, exports.ErrorResponse)({ message, status: 404, extra });
};
exports.NotFound = NotFound;
const Conflict = ({ message = "Conflict", extra = undefined } = {}) => {
    return (0, exports.ErrorResponse)({ message, status: 409, extra });
};
exports.Conflict = Conflict;
const forbidden = ({ message = "Forbidden", extra = undefined } = {}) => {
    return (0, exports.ErrorResponse)({ message, status: 403, extra });
};
exports.forbidden = forbidden;
const unauthorized = ({ message = "Unauthorized", extra = undefined } = {}) => {
    return (0, exports.ErrorResponse)({ message, status: 401, extra });
};
exports.unauthorized = unauthorized;
const globalErrorHandler = (error, req, res, next) => {
    const status = error.cause?.status || 500;
    const extra = error.cause?.extra || null;
    res.status(status).json({
        status,
        errorMessage: error.message || "Something went wrong",
        extra,
        stack: env_service_1.mood === "dev" ? error.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
