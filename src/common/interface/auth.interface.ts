import { Types } from "mongoose";
import { Request} from "express";
export interface iAuth {
    name: string 
    age: number 
    email: string 
    password: string 
    gender: string 
    role: string 
    provider: string 
    isverify: boolean 
    _id: Types.ObjectId 
    view_profile: number
    Reactions: string
}

export interface Aichat {
    prompt : string 
    message: string
    media?: string | any
    status: string
    userid: Types.ObjectId | string
}



export interface userToken {
    _id: Types.ObjectId; 
    role: string ;
}



export interface AuthenticatedRequest extends Request {
    userid?: string | Types.ObjectId;
    Token?: string;
    decode?: any 
}