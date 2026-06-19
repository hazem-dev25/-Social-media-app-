import mongoose from "mongoose";

const messageSchma =  new mongoose.Schema({
message: {
    type: String ,
    required: true
} ,
senders:[   {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Auth' ,
    required: true
} ],
RoomId:[{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Room' ,
    required: true 
}]
})

export const messageModel = mongoose.model('Messages' , messageSchma)

