"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Authservice {
    constructor() {
    }
    signup(data) {
        const { name, email, age, gender, password } = data;
        return data;
    }
    login(data) {
        const { email, password } = data;
        return data;
    }
}
exports.default = new Authservice;
