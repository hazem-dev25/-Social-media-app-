"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const SuccessResponse = ({ res, message = 'Success', data, status = 200 }) => {
    return res.status(status).json({
        status: 'success',
        message,
        data
    });
};
exports.SuccessResponse = SuccessResponse;
