import { Types } from "mongoose";
import { Request} from "express";
export interface iUser {
    name: string ;
    age: number ;
    email: string ;
    password: string ;
    gender: string ;
    role: string ;
    provider: string ;
    isverify: boolean
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