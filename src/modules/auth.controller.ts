import { Router } from "express";
import  type { Request , Response } from 'express';
import { Types } from "mongoose";
export const userRouter = Router();
import authService from "./auth.service";
import { validation } from "../common/middelware/validation.middelware";
import { signupSchema } from "./auth.validaton";
import { SuccessResponse } from "../common/exception/success.responce";
import { auth } from "../common/middelware/auth";
import { AuthenticatedRequest } from "../common/interface/user.interface";




userRouter.post('/signup' , validation(signupSchema) , async (req: Request , res: Response)=>{
    let userData = await authService.signup(req.body)
    SuccessResponse({res , message: "signup success" , data: userData , status: 201})
})


userRouter.post('/login' , async (req: Request , res: Response)=>{
    let userData = await authService.login(req.body)
    SuccessResponse({res , message: "login success" , data: userData , status: 200})
})


userRouter.get('/get_user_by_id'  ,auth,  async (req: AuthenticatedRequest , res: Response)=>{
    console.log(req.userid)
    let users = await authService.getAllUsersByID(req.userid as string)
    SuccessResponse({res , data: users, message: "get all users succ", status: 200})
})


userRouter.patch('/update_user_by_id' , auth , async (req: AuthenticatedRequest , res: Response)=>{
    let user = await authService.updateUserByID(req.userid as string , req.body)
    SuccessResponse({res , data: user, message: "update user succ", status: 200})
})


userRouter.delete('/delete_user_by_id' , auth , async (req: AuthenticatedRequest , res: Response)=>{
    let user = await authService.deleteUserByID(req.userid as string)
    SuccessResponse({res , data: user, message: "delete user succ", status: 200})
})


userRouter.post('/refresh_token' ,auth ,  async (req: AuthenticatedRequest , res: Response)=>{
    let refreshToken = await authService.refreshToken(req.token as string)
    SuccessResponse({res , data: refreshToken, message: "refresh token generated", status: 200})
})