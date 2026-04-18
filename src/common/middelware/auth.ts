import { NextFunction  , Request , Response} from 'express'
import jwt from 'jsonwebtoken'
import { NotFoundException, UnauthorizedException } from '../exception/application.exception'
import { AuthenticatedRequest } from '../interface/user.interface'
import token from '../security/security'
import redisService from '../service/redis.service'



export const auth =  async (req: AuthenticatedRequest , res:Response, next: NextFunction)=>{
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
   
    let revoke = await redisService.get(`key::${Token}`)
    
    if(revoke){
      throw new NotFoundException('user is alredy logout')
    }
    req.userid = verify.id || verify._id
    req.Token = Token
    req.decode = decode
   
    
    break;
  }
  next()
}