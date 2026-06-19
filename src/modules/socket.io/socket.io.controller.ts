import { Request, Response, Router } from "express";
import { SuccessResponse } from "../../common/exception/success.responce";
import { AuthenticatedRequest } from "../../common/interface/auth.interface";
import socketService from "./socket.io.service";
import { auth } from "../../common/middelware/auth";

export const socketRouter = Router()


socketRouter.get('/get_room_id/:id'  ,async (req:Request ,res:Response)=>{
let roomID = await socketService.roomId(req.params.id as string)
SuccessResponse({res , message: 'room_ID' , data: roomID , status: 201})
})

socketRouter.get('/get_messages/:id' ,  async (req:Request ,res:Response)=>{
let roomID = await socketService.messages(req.params.id as string)
SuccessResponse({res , message: 'All_messages' , data: roomID , status: 201})
})