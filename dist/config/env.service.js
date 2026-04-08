"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_USER_JWT = exports.REFRESH_ADMIN_JWT = exports.USER_JWT = exports.ADMIN_JWT = exports.mode = exports.port = exports.url = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
});
const url = process.env.DB_URL;
exports.url = url;
const port = process.env.PORT;
exports.port = port;
const mode = process.env.MODE;
exports.mode = mode;
const ADMIN_JWT = process.env.ADMIN_JWT;
exports.ADMIN_JWT = ADMIN_JWT;
const USER_JWT = process.env.USER_JWT;
exports.USER_JWT = USER_JWT;
const REFRESH_ADMIN_JWT = process.env.REFRESH_ADMIN_JWT;
exports.REFRESH_ADMIN_JWT = REFRESH_ADMIN_JWT;
const REFRESH_USER_JWT = process.env.REFRESH_USER_JWT;
exports.REFRESH_USER_JWT = REFRESH_USER_JWT;
