"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const auth_service_1 = __importDefault(require("./auth.service"));
const validation_middelware_1 = require("../common/middelware/validation.middelware");
const auth_validaton_1 = require("./auth.validaton");
const success_responce_1 = require("../common/exception/success.responce");
exports.userRouter.post('/signup', (0, validation_middelware_1.validation)(auth_validaton_1.signupSchema), async (req, res) => {
    let userData = await auth_service_1.default.signup(req.body);
    (0, success_responce_1.SuccessResponse)({ res, message: "signup success", data: userData, status: 201 });
});
exports.userRouter.post('/login', async (req, res) => {
    let userData = await auth_service_1.default.login(req.body);
    (0, success_responce_1.SuccessResponse)({ res, message: "login success", data: userData, status: 200 });
});
