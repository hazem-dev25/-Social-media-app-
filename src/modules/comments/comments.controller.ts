import { Request, Response, Router } from "express";
import commentsService from "./comments.service";
import { auth } from "../../common/middelware/auth";
import { AuthenticatedRequest } from "../../common/interface/auth.interface";
import { commentsValidation } from "./comments.validation";
import { validation } from "../../common/middelware/validation.middelware";
import { SuccessResponse } from "../../common/exception/success.responce";


export const commentRouter = Router()


commentRouter.post('/addComments' , auth ,validation(commentsValidation) ,  async  (req:AuthenticatedRequest , res: Response )=>{
let comment = await commentsService.addcomment(req.body as string)
SuccessResponse({res , message: "comment added succ" , data: comment , status: 201})
})


commentRouter.get('/getAllComments' , async  (req:Request , res:Response)=>{
let comment = await commentsService.getAllComments()
SuccessResponse({res , message: "there is all comments" , data: comment , status: 200})
})


commentRouter.get('/getCommentsbyPost/:id' , async (req:Request , res:Response)=>{
let comment = await commentsService.getCommentsbyPost(req.params.id as string)
SuccessResponse({res, message: "here is the comments" , data: comment , status: 200})
})


commentRouter.patch('/updateComment/:id' , auth , async (req: AuthenticatedRequest ,res: Response)=>{
let comment = await commentsService.updateComment(req.userid as string , req.params.id as string , req.body as string)
SuccessResponse({res, message: "comment updated succ" , data: comment , status: 201})
})


commentRouter.delete('/deleteComment/:id' , auth , async (req: AuthenticatedRequest , res:Response)=>{
let comment = await commentsService.deleteComment(req.userid as string , req.params.id as string)
SuccessResponse({res , message: 'comment deleted succ' , data: comment , status: 200})
})


