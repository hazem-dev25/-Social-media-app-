"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRefreshToken = exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const reseponce_1 = require("../utils/reseponce");
const env_service_1 = require("../../config/env.service");
const generateToken = (userID) => {
    let signature;
    let refreshSignature;
    let audience;
    switch (userID.role) {
        case 'admin':
            signature = env_service_1.ADMIN_JWT;
            refreshSignature = env_service_1.REFRESH_ADMIN_JWT;
            audience = 'admin';
            break;
        case 'user':
            signature = env_service_1.USER_JWT;
            refreshSignature = env_service_1.REFRESH_USER_JWT;
            audience = 'user';
            break;
        default:
            throw (0, reseponce_1.unauthorized)({ message: 'invalid user role' });
    }
    const token = jsonwebtoken_1.default.sign({ id: userID._id }, signature, { expiresIn: '30m', audience: audience });
    const refreshToken = jsonwebtoken_1.default.sign({ id: userID._id }, refreshSignature, { expiresIn: '1y', audience });
    return { token, refreshToken };
};
exports.generateToken = generateToken;
const decodeToken = (decode, token) => {
    let signature = undefined;
    switch (decode.aud) {
        case "admin":
            signature = env_service_1.ADMIN_JWT;
            break;
        case "user":
            signature = env_service_1.USER_JWT;
            break;
        default:
            throw (0, reseponce_1.unauthorized)({ message: "invalid user role" });
    }
    let verify = jsonwebtoken_1.default.verify(token, signature);
    return verify;
};
exports.decodeToken = decodeToken;
const decodeRefreshToken = (token) => {
    let decode = jsonwebtoken_1.default.decode(token);
    let refreshSignature = undefined;
    switch (decode.aud) {
        case "admin":
            refreshSignature = env_service_1.REFRESH_ADMIN_JWT;
            break;
        case "user":
            refreshSignature = env_service_1.REFRESH_USER_JWT;
            break;
        default:
            throw (0, reseponce_1.unauthorized)({ message: "invalid user role" });
    }
    let verify_refresh = jsonwebtoken_1.default.verify(token, refreshSignature);
    return verify_refresh;
};
exports.decodeRefreshToken = decodeRefreshToken;
