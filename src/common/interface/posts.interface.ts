import { Types } from "mongoose";
import { iUser } from "./user.interface";
import {PostVisibility} from '../enums/posts.enums'


export interface IPost {
    userid: Types.ObjectId | iUser;
    content?: string | undefined;
    attachments?: string[] | undefined; 
    tags?: string[] | iUser[];
    likes: string[] | iUser[];
    createdAt: Date;
    updatedAt: Date;
    visibility: PostVisibility
}