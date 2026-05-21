import {Router , Response} from 'express'
import { auth } from '../../common/middelware/auth'
import { AuthenticatedRequest } from '../../common/interface/auth.interface'
import userService from './user.service'
import { SuccessResponse } from '../../common/exception/success.responce'
import { multerSend } from '../../common/middelware/multer'


export let userRouter = Router()


userRouter.get('/get_user_profile' , auth , async (req: AuthenticatedRequest ,res:Response)=>{
    let user = await userService.getUserProfile(req.userid as string)
    SuccessResponse({res , message: 'user profile fetched successfully' , data: user , status: 200})
})

userRouter.post('/create_user' , auth ,multerSend({custompath: "profile_pics"}).single('image') , async (req: AuthenticatedRequest ,res:Response)=>{
    req.body.userid = req.userid as string
    let createdUser = await userService.createUser(req.body , req.file )
    SuccessResponse({res , message: 'user created successfully' , data: createdUser , status: 201})
})


userRouter.get('/create_profile_url/:username' , async (req: AuthenticatedRequest , res:Response)=>{
    let url = await userService.create_profile_url(req.params.username as string, `${req.protocol}://${req.host}/profile/`)
    SuccessResponse({res , message: 'profile url created successfully' , data: url , status: 201})
})


userRouter.post('/send_notification/:userid' , auth,  async (req: AuthenticatedRequest , res:Response)=>{
  let notification = await userService.sendNotification(req.params.userid as string, req.body.token)
  SuccessResponse({res , message: 'notification sent successfully' , data: notification , status: 200})
})
