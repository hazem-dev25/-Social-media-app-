"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boostrap = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const env_service_1 = require("./config/env.service");
const auth_controller_1 = require("./modules/auth.controller");
const error_middelware_1 = require("./common/middelware/error.middelware");
const boostrap = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(auth_controller_1.userRouter);
    app.use(error_middelware_1.globalErrorHandler);
    await (0, connection_1.connectDB)();
    app.listen(env_service_1.port, () => {
        console.log(`Server is running on port ${env_service_1.port}`);
    });
};
exports.boostrap = boostrap;
