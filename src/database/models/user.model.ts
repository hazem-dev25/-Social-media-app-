import mongoose from "mongoose";
import { iUser } from "../../common/interface/user.interface";

let userSchema = new mongoose.Schema<iUser>({
    userid: { type: String,ref: "Auth", required: true} , 
    username: {type: String , required: true , unique: true},
    age: {type: Number , required: true},
    image: {type: String , default: ''},
    about: {type: String},
    Tokens: [{type: String}],
    friends: [{type: mongoose.Schema.Types.ObjectId , ref: 'User'}]
} , {timestamps: true})


let userModel = mongoose.model('user' , userSchema)

export {userModel}