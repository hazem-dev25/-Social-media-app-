import { Router } from "express";
import  type { Request , Response } from 'express';
export const userRouter = Router();
import authService from "./auth.service";
import { validation } from "../common/middelware/validation.middelware";
import { signupSchema } from "./auth.validaton";
import { SuccessResponse } from "../common/exception/success.responce";
import { auth } from "../common/middelware/auth";
import { AuthenticatedRequest } from "../common/interface/user.interface";
import { BadRequestException } from "../common/exception/application.exception";
import { Url } from "url";




userRouter.post('/signup' , validation(signupSchema) , async (req: Request , res: Response)=>{
    let userData = await authService.signup(req.body)
    SuccessResponse({res , message: "signup success" , data: userData , status: 201})
})


userRouter.post('/verify_email' , async (req: Request , res: Response)=>{
    let verify = await authService.verifyEmail(req.body)
    SuccessResponse({res , message: "email verified successfully" , status: 200})
})


userRouter.post('/login' , async (req: Request , res: Response)=>{
    let userData = await authService.login(req.body)
    SuccessResponse({res , message: "login success" , data: userData , status: 200})
})


userRouter.post('/forgetPassword' , auth , async (req:Request , res:Response)=>{
    let userData = await authService.forgetPassword(req.body)
    SuccessResponse({res , message: "check your email" , data: userData , status: 200})
})


userRouter.patch('/resetPassword' , auth , async (req:AuthenticatedRequest , res: Response)=>{
    let userData = await authService.resetPassword(req.userid as string , req.body , `${req.protocol}:${req.host}`)
    SuccessResponse({res, message: "your password is reset succsse" , data: userData , status: 201})
})


userRouter.get('/get_all_users' , async (req: Request , res: Response)=>{
    let users = await authService.getAllUsers()
    SuccessResponse({res , data: users, message: "get all users succ", status: 200})
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


userRouter.post('/refresh_token' , async (req: Request , res: Response)=>{
    let { authorization } = req.headers
    if (!authorization) {
        throw new BadRequestException("No token provided")
    }
    const token = authorization.split(" ")[1]
    let refreshToken = await authService.refreshToken(token)
    SuccessResponse({res , data: refreshToken, message: "refresh token generated", status: 200})
})


userRouter.post('/revokeToken' , auth , async (req: AuthenticatedRequest , res: Response )=>{
    let token = await authService.revokeToken(req.Token)
    SuccessResponse({res , message: "token revoked"  , data: token , status: 200})
})
