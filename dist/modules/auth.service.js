"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../database/models/user.model");
const security_1 = require("../common/security/security");
const application_exception_1 = require("../common/exception/application.exception");
class Authservice {
    constructor() {
    }
    async signup(data) {
        let isExist = await user_model_1.userModel.findOne({ email: data.email });
        if (isExist) {
            throw new application_exception_1.BadRequestException("email already exist");
        }
        if (data.password !== data.confirmPassword) {
            throw new application_exception_1.BadRequestException("password and confirm password must be the same");
        }
        let result = await user_model_1.userModel.create(data);
        let { token, refreshToken } = (0, security_1.generateToken)(result);
        return {
            result,
            token,
            refreshToken
        };
    }
    login(data) {
        return data;
    }
}
exports.default = new Authservice;
