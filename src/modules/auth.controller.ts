import { Router } from "express";
import  type { Request , Response } from 'express';
export const userRouter = Router();
import authService from "./auth.service";
import { validation } from "../common/middelware/validation.middelware";
import { signupSchema } from "./auth.validaton";
import { SuccessResponse } from "../common/exception/success.responce";



userRouter.post('/signup' , validation(signupSchema) , async (req: Request , res: Response)=>{
    let userData = await authService.signup(req.body)
    SuccessResponse({res , message: "signup success" , data: userData , status: 201})
})


userRouter.post('/login' , async (req: Request , res: Response)=>{
    let userData = await authService.login(req.body)
    SuccessResponse({res , message: "login success" , data: userData , status: 200})
})