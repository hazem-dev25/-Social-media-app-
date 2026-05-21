import {Router , Request , Response} from 'express'
import { multerSend } from '../../common/middelware/multer'
import { auth } from '../../common/middelware/auth'
import { validation } from '../../common/middelware/validation.middelware'
import { createPostSchema } from './post.validation'
import postService from './post.service'
import { SuccessResponse } from '../../common/exception/success.responce'
import {AuthenticatedRequest} from '../../common/interface/auth.interface'

export const postRouter = Router()




postRouter.post('/createPost' , auth ,multerSend({custompath: 'posts'}).array('attachment' , 5) ,
    validation(createPostSchema)
     ,async (req: AuthenticatedRequest ,res: Response)=>{
    let post = await postService.createPost(req)
    SuccessResponse({res ,message: 'Post created successfully' ,data: post ,status: 201})
})


postRouter.get('/getPosts/:userid' , auth ,async (req: Request , res: Response)=>{
    let posts = await postService.getPosts(req.params.userid as string)
    SuccessResponse({res ,message: 'Posts retrieved successfully' ,data: posts ,status: 200})
})


postRouter.delete('/deletePost/:id' , auth , async (req: AuthenticatedRequest, res: Response)=>{
    let post = await postService.deletePost(req.params.id as string , req.userid as string)
    SuccessResponse({res , message: 'post deleted succ' , data: post , status: 200})
})