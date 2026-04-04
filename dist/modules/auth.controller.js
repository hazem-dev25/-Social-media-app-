"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const auth_service_1 = __importDefault(require("./auth.service"));
const reseponce_1 = require("../common/utils/reseponce");
const validation_1 = require("../common/middelware/validation");
const auth_validaton_1 = require("./auth.validaton");
exports.userRouter.post('/signup', (0, validation_1.validation)(auth_validaton_1.signupSchema), (req, res) => {
    let userData = auth_service_1.default.signup(req.body);
    (0, reseponce_1.success)({ res, data: userData, message: 'user signup succuss', status: 200 });
});
exports.userRouter.post('/login', (req, res) => {
    let userData = auth_service_1.default.login(req.body);
    (0, reseponce_1.success)({ res, data: userData, message: 'user login succuss', status: 200 });
});
