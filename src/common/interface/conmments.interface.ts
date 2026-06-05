import { Types } from "mongoose";

export interface Icomments   {
userid: String 
postid: string
text: String  
mention?: string 
Emoji?: String
}