import { NextFunction  , Request , Response} from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedException } from '../exception/application.exception'
import {decodeToken} from '../security/security'
import { AuthenticatedRequest } from '../interface/user.interface'



export const auth = (req: AuthenticatedRequest , res:Response, next: NextFunction)=>{
  console.log("Headers received:", req.headers.authorization);
    let {authorization} = req.headers
    if(!authorization){
        throw new UnauthorizedException("you are not authorized")
    }

     let [flag , token]: any = authorization.split(" ")
  switch (flag) {
    case "Basic":
      let data = Buffer.from(token , 'base64').toString()
      let [email , password] = data.split(':')
      console.log(email , password)
      break;
    case "Bearer":
     
    const decode = jwt.decode(token) as { _id: string, [key: string]: any }

    const verify = decodeToken(decode, token) as { _id: string, [key: string]: any }

    
    req.userid = verify.id || verify._id
    req.token = token
    req.decode = decode
    
    break;
  }
  next()
}