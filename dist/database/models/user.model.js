"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const enums_service_1 = require("../../common/enums/enums.service");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        select: false
    },
    gender: {
        type: String,
        enum: Object.values(enums_service_1.Gender),
        default: enums_service_1.Gender.male
    },
    role: {
        type: String,
        enum: Object.values(enums_service_1.role),
        default: enums_service_1.role.user
    },
    provider: {
        type: String,
        enum: Object.values(enums_service_1.provider),
        default: enums_service_1.provider.system
    },
    isverify: {
        type: Boolean,
        default: false
    }
});
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt_1.default.hash(this.password, 12);
});
exports.userModel = mongoose_1.default.model('social', userSchema);
