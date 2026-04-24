import express, { Request, Router } from 'express'
import { auth } from '../common/middelware/auth'
import { Response } from 'express'
import { SuccessResponse } from '../common/exception/success.responce'
import aiService from './ai.service'
import { AuthenticatedRequest } from '../common/interface/user.interface'

export const Ai = Router()


Ai.post('/AiChatModel' , auth , async (req:AuthenticatedRequest , res:Response)=>{
let AiChat = await aiService.AiChat(req.body.prompt as string , req.userid as string)
SuccessResponse({res , message:'AI chat is running' , data: AiChat , status: 200})
}) 