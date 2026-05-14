import { loginDTO, signupDTO, verifyDTO} from "./auth.dto";
import { authModel } from "../../database/models/auth.model";
import { iAuth } from "../../common/interface/auth.interface";
import { HydratedDocument, Model} from "mongoose";
import { BadRequestException, NotFoundException } from "../../common/exception/application.exception";
import token from '../../common/security/security'
import jwt from 'jsonwebtoken'
import { compare} from "bcrypt";
import { ADMIN_JWT, USER_JWT } from "../../config/env.service";
import { emailEvent } from "../../common/utils/SendEmail/email.event";
import { DatabaseRepository } from "../../database/repository/database.repository";
import redisService from "../../common/service/redis.service";
import { Url } from "url";





class Authservice {
  private authModel: Model<iAuth>
  private userRepository: DatabaseRepository<iAuth>
  constructor() {
    this.authModel = authModel
    this.userRepository = new DatabaseRepository(this.authModel)
}
  async signup(data: signupDTO): Promise<iAuth> {
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


    async verifyEmail(data: verifyDTO ): Promise<HydratedDocument<iAuth>> {
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


    async login(data: loginDTO) :  Promise<{ user:Partial<HydratedDocument<iAuth>> , acsesstoken: string | undefined, refreshToken: string | undefined}> {
    let userWithPassword = await this.userRepository.findOne({email: data.email} , {password: 1 , role: 1})
      
    if(!userWithPassword){
        throw new BadRequestException("email not found")
      }

    const ismatch = await compare(data.password, userWithPassword.password)
    if(!ismatch){
      throw new BadRequestException("password is incorrect")
    } 
    const [acsesstoken, refreshToken] = token.genarateToken( {_id:userWithPassword._id,   role: userWithPassword.role} )
    
    let user = await this.userRepository.findOne({ email: data.email}  , {password: 0} )
    
    if (!user){
      throw new BadRequestException("email not found")
    } 

    if (!user) throw new BadRequestException("email not found");

      return {user, acsesstoken, refreshToken}
    }


    async forgetPassword(data: loginDTO): Promise<HydratedDocument<iAuth>>{
      let user = await this.userRepository.findOne({email: data.email})
      if(!user){
     throw new  BadRequestException('user is not exist')
      }
      
      emailEvent.emit('forget_password' , {email: user.email , userID: user._id , name: user.name})

      return user
    }


    async resetPassword(id: string ,data: any , host: Url | any) : Promise<iAuth>{
      let loginUrl = `${host}/login`
      let user = await this.userRepository.findOne({email: data.email})
      if(!user){
        throw new NotFoundException('user is not found')
      }
      if(!data.password || !data.code || !data.email){
        throw new BadRequestException("code , password and email is required")
      }
      let updatePassword = await this.userRepository.findByIdAndUpdate(id ,{password: user.password})

      if(!updatePassword){
        throw new BadRequestException('password not updated')
        
      }
      
      emailEvent.emit('resetPassword' ,{email: user.email , name:user.name , code: data.code , userID: user._id , host: loginUrl})

      return user
    }

    async getAllUsers(): Promise<HydratedDocument<iAuth>[]> {
      let allusers = await this.userRepository.find({}, {password:  0} )
      return allusers
    }

    async getAllUsersByID(id: string): Promise<HydratedDocument<iAuth>> {
      let user = await authModel.findById(id).select("-password")
      if(!user){
        throw new BadRequestException("user not found")
      }
      return user
    }

    async updateUserByID(id: string , data: Partial<iAuth>): Promise<HydratedDocument<iAuth>> {
      let {name , age , gender} = data
      let user = await authModel.findByIdAndUpdate(id , {data: {name, age, gender}} , {new: true}).select("-password")
      if(!user){
      throw new BadRequestException("user not found")
    }
        return user

}
    async deleteUserByID(id: string): Promise<HydratedDocument<iAuth>> {
    let user = await authModel.findByIdAndDelete(id).select("-password")
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


   async revokeToken(data : any){
    let revokeKey = `key::${data}`
   await redisService.set({
    key: revokeKey ,
    value: 1 ,
    ttl : Date.now() + 30 * 60
   })
   }

   async view_pofile(id: string): Promise<Partial<HydratedDocument<iAuth>>>{
    let updateView = await this.userRepository.findByIdAndUpdate(id , {$inc: {view_profile: 1}}) 
     if(!updateView){
      throw new NotFoundException("user is not found")
     }
     return updateView
   }

}

export default new Authservice