import { loginDTO, signupDTO} from "./auth.dto";
import { userModel } from "../database/models/user.model";
import { iUser } from "../common/interface/user.interface";
import { HydratedDocument } from "mongoose";
import { generateToken } from "../common/security/security";
import { BadRequestException } from "../common/exception/application.exception";



class Authservice {
    constructor() {
    }
  async signup(data: signupDTO): Promise<{ result: HydratedDocument<iUser>, token: string, refreshToken: string }> {
      let isExist = await userModel.findOne({email: data.email})
      if(isExist){
        throw new BadRequestException("email already exist")
      }
      if(data.password !== data.confirmPassword){
        throw new BadRequestException("password and confirm password must be the same")
      }
      let result = await userModel.create(data)
        let {token , refreshToken} = generateToken(result)
        return {
            result,
            token ,
            refreshToken    
        }
        
    }

    login(data: loginDTO) : loginDTO{
        
        return data
    }
}

export default new Authservice