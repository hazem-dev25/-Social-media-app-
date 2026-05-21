import { Types } from "mongoose"

export interface iUser {
    username: string 
    age: number 
    image?: string 
    about?: string 
    userid: string
    Tokens?: string[]
    friends?: Types.ObjectId[]
}