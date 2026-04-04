"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
const success = ({ res, data = null, message = "Done", status = 200, }) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};
exports.success = success;
