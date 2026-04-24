import mongoose from "mongoose";
import { Aichat } from "../../common/interface/user.interface";


const AiChatSchema = new mongoose.Schema<Aichat>({
prompt: {
    type: String ,
    required: true
} ,
message: {
    type: String ,
    required: true
} ,
media: {
     type: String,
     default: null 
} ,
status: {
    type: String
}

} ,{ timestamps: true })


export  const AiModel = mongoose.model('AiModel' , AiChatSchema)