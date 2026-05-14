import mongoose from "mongoose";
import { iUser } from "../../common/interface/user.interface";

let userSchema = new mongoose.Schema<iUser>({
    username: {type: String , required: true , unique: true},
    age: {type: Number , required: true},
    image: {type: String , default: ''},
    about: {type: String},
    Tokens: [{type: String}]
} , {timestamps: true})


let userModel = mongoose.model('user' , userSchema)

export {userModel}