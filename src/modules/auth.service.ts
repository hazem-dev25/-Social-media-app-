import { loginDTO, signupDTO, verifyDTO} from "./auth.dto";
import { userModel } from "../database/models/user.model";
import { iUser } from "../common/interface/user.interface";
import { HydratedDocument, Model} from "mongoose";
import { BadRequestException } from "../common/exception/application.exception";
import token from '../common/security/security'
import jwt from 'jsonwebtoken'
import { compare} from "bcrypt";
import { ADMIN_JWT, USER_JWT } from "../config/env.service";
import { emailEvent } from "../common/utils/SendEmail/email.event";
import { DatabaseRepository } from "../database/repository/database.repository";
import redisService from "../common/service/redis.service";




class Authservice {
  private userModel: Model<iUser>
  private userRepository: DatabaseRepository<iUser>
  constructor() {
    this.userModel = userModel
    this.userRepository = new DatabaseRepository(this.userModel)
}
  async signup(data: signupDTO): Promise<iUser> {
    let isExist = await this.userRepository.findOne({email: data.email})
    if(isExist){
        throw new BadRequestException("email already exist")
    }

    if(data.password !== data.confirmPassword){
        throw new BadRequestException("password and confirm password must be the same")
    }
   let newUser = await this.userRepository.create(data)
   
   if(newUser){
  }
  emailEvent.emit("send_email" , {email: newUser.email , name: newUser.name , userID: newUser._id})
     
     return newUser
    }


    async verifyEmail(data: verifyDTO ): Promise<HydratedDocument<iUser>> {
      let user = await this.userRepository.findOne({email: data.email})
      if(!user){
        throw new BadRequestException("email not found")
      }
      if(user.isverify){
        throw new BadRequestException("email already verified")  
      }
      emailEvent.emit("varify_email" , {email: user.email , code: data.code , userID: user._id , name: user.name})
      return  user
    }


    async login(data: loginDTO) :  Promise<{ user:Partial<HydratedDocument<iUser>> , acsesstoken: string | undefined, refreshToken: string | undefined}> {
    let user = await this.userRepository.findOne({email: data.email} , {password: 1 })
      
    if(!user){
        throw new BadRequestException("email not found")
      }

    const ismatch = await compare(data.password, user.password)
    if(!ismatch){
      throw new BadRequestException("password is incorrect")
    } 

    const [acsesstoken, refreshToken] = token.genarateToken( {_id:user._id,   role: user.role} )
    
      return {user, acsesstoken, refreshToken}
    }

    async getAllUsers(): Promise<HydratedDocument<iUser>[]> {
      let allusers = await this.userRepository.find({}, {password:  0} )
      return allusers
    }

    async getAllUsersByID(id: string): Promise<HydratedDocument<iUser>> {
      let user = await userModel.findById(id).select("-password")
      if(!user){
        throw new BadRequestException("user not found")
      }
      return user
    }

    async updateUserByID(id: string , data: Partial<iUser>): Promise<HydratedDocument<iUser>> {
      let {name , age , gender} = data
      let user = await userModel.findByIdAndUpdate(id , {data: {name, age, gender}} , {new: true}).select("-password")
      if(!user){
      throw new BadRequestException("user not found")
    }
        return user

}
    async deleteUserByID(id: string): Promise<HydratedDocument<iUser>> {
    let user = await userModel.findByIdAndDelete(id).select("-password")
    if(!user){
      throw new BadRequestException("user not found")
    }
    return user

   }

   async refreshToken(Token: any): Promise<{ acsesstoken: string | undefined}> {
    console.log("Received refresh token:", Token)
    let decode: any =  token.decodeRefreshToken(Token)
    console.log(decode.aud)
    let signature: string | undefined
    switch (decode.aud) {
      case"user":
      signature = USER_JWT
      break;

      case"admin":
      signature = ADMIN_JWT
      break;

      default:
        throw new BadRequestException("invalid refresh token")
    }

    const acsesstoken  = jwt.sign({ _id: decode._id }, signature!, { expiresIn: '30m', audience: decode.aud});

      return {acsesstoken}
   }


   async revokeToken(req: any){
    let revokeKey = `key::${req._id}::${req.token}`
   await redisService.set({
    key: revokeKey ,
    value: 1 ,
    ttl : req.decode.iat + 30 * 60
   })
   }
}

export default new Authservice