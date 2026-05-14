import mongoose from "mongoose";
import { IPost } from "../../common/interface/posts.interface";
import { PostVisibility } from "../../common/enums/posts.enums";

const postSchema = new mongoose.Schema<IPost>({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    } ,
    attachments: [{
        type: String , 
        default: []
    }] ,
    content: {
        type: String,
        required: function(this: IPost) {
            return !this.attachments || this.attachments.length === 0;
        }
    },
    tags: [{
        type: String, 
        ref: 'User',
        default: []
    }],
    likes: {
        type: [String],
        default: [] ,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    visibility: {
        type: String,
        default: PostVisibility.public
    }
} ,{timestamps: true,
    strictQuery: true
});





export const postModel = mongoose.model("Post", postSchema);