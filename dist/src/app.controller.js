"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boostrap = void 0;
const express_1 = __importDefault(require("express"));
const boostrap = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const Users = [{ id: 1, name: "hazem", age: 34, email: "hadel6464@gmail.com", password: "hasg" }];
    app.get('/get_users', (req, res) => {
        res.json({ Users });
    });
    app.post('/add_user', (req, res) => {
        let { name, age, email, password } = req.body;
        let id = Users.length + 1;
        let isExsist = Users.find(user => user.email === email);
        if (isExsist) {
            res.json({ message: "the user is Already exist" });
        }
        Users.push({ id, name, age, email, password });
        res.json({ Users, message: "user added succssful" });
    });
    app.patch('/update_user/:id', (req, res) => {
        let { name } = req.body;
        let { id } = req.params;
        let userData = Users.findIndex(u => u.id === Number(id));
        if (userData === -1) {
            res.json({ message: "the user is not exist" });
        }
        let user = Users[userData];
        console.log(user);
        user.name = name;
        res.json({ Users, message: "user updated succssful" });
    });
    app.delete('/delete_user/:id', (req, res) => {
        let { id } = req.params;
        let userData = Users.findIndex(u => u.id === Number(id));
        if (userData === -1) {
            res.json({ message: "the user is not exist" });
        }
        Users.splice(userData, 1);
        res.json({ Users, message: "user deleted succssful" });
    });
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};
exports.boostrap = boostrap;
