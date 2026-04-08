"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = {
    body: zod_1.z.strictObject({
        name: zod_1.z.string().min(2).max(20),
        age: zod_1.z.number().min(18).max(100),
        email: zod_1.z.email().trim(),
        password: zod_1.z.string().min(8).max(15),
        confirmPassword: zod_1.z.string().min(8).max(15)
    }).superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: "Passwords don't match",
            });
        }
    })
};
