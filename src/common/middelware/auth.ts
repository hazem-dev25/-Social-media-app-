import { NextFunction  , Request , Response} from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedException } from '../exception/application.exception'
import { AuthenticatedRequest } from '../interface/user.interface'
import token from '../security/security'



export const auth = (req: AuthenticatedRequest , res:Response, next: NextFunction)=>{
    let {authorization} = req.headers
    if(!authorization){
        throw new UnauthorizedException("you are not authorized")
    }

     let [flag , Token]: any = authorization.split(" ")
  switch (flag) {
    case "Basic":
      let data = Buffer.from(Token , 'base64').toString()
      let [email , password] = data.split(':')
      console.log(email , password)
      break;
    case "Bearer":
     
    const decode = jwt.decode(Token) as { _id: string, aud: string, [key: string]: any }

    const verify = token.decodeToken(decode, Token) as { _id: string,  [key: string]: any }

    req.userid = verify.id || verify._id
    req.Token = Token
    req.decode = decode
    
    break;
  }
  next()
}