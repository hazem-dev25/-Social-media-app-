"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boostrap = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const env_service_1 = require("./config/env.service");
const index_1 = require("./common/utils/reseponce/index");
const auth_controller_1 = require("./modules/auth.controller");
const boostrap = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(auth_controller_1.userRouter);
    await (0, connection_1.connectDB)();
    app.use(index_1.globalErrorHandler);
    app.listen(env_service_1.port, () => {
        console.log('Server is running on port 3000');
    });
};
exports.boostrap = boostrap;
