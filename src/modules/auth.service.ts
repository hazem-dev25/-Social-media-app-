import { loginDTO, signupDTO} from "./auth.dto";
import { userModel } from "../database/models/user.model";
import { iUser } from "../common/interface/user.interface";
import { HydratedDocument} from "mongoose";
import { BadRequestException } from "../common/exception/application.exception";
import token from '../common/security/security'
import { compare} from "bcrypt";
import { ADMIN_JWT, USER_JWT } from "../config/env.service";



class Authservice {
  constructor() {
}
  async signup(data: signupDTO): Promise<HydratedDocument<iUser>> {
    let isExist = await userModel.findOne({email: data.email})
    if(isExist){
        throw new BadRequestException("email already exist")
    }

    if(data.password !== data.confirmPassword){
        throw new BadRequestException("password and confirm password must be the same")
    }
   let newUser = await userModel.create(data)
     
     return newUser
    }

    async login(data: loginDTO) :  Promise<{ user:Partial<HydratedDocument<iUser>> , acsesstoken: string | undefined, refreshToken: string | undefined}> {
    let user = await userModel.findOne({email: data.email}).select("+password")
      
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

   async refreshToken(token: any): Promise<{ acsesstoken: string | undefined, refreshToken: string | undefined}> {
    let decode: any =  token.decodeRefreshToken(token)
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

    const [acsesstoken, refreshToken] = token.genarateToken( {_id:decode._id,   role: decode.role} , signature )

      return {acsesstoken, refreshToken}

   }

}

export default new Authservice