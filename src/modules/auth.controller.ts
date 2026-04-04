import { Router } from "express";
import  type { Request , Response } from 'express';
export const userRouter = Router();
import authService from "./auth.service";
import { success } from "../common/utils/reseponce";
import { validation } from "../common/middelware/validation";
import { signupSchema } from "./auth.validaton";


userRouter.post('/signup' , validation(signupSchema) ,(req: Request , res: Response)=>{
    let userData = authService.signup(req.body)
   success({res, data: userData , message: 'user signup succuss' , status: 200})
})


userRouter.post('/login' ,(req: Request , res: Response)=>{
    let userData = authService.login(req.body)
   success({res, data: userData , message: 'user login succuss' , status: 200})
})