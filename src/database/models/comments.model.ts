import mongoose, { Types } from "mongoose";
import { Icomments } from "../../common/interface/conmments.interface";
import { required } from "zod/mini";


let commentsSchema = new mongoose.Schema<Icomments>({
userid: {
        type: Types.ObjectId ,
        ref: "User",
        required: true
        
    }, 
postid:{
    type: String,
    ref: "Post",
    required: true
}, 
text: {
    type: String ,
    required: true
},
mention: {
    type: String,
    ref: "User",
} ,
Emoji: {
    type: String
}
})


export const commentModel = mongoose.model("comments" , commentsSchema)