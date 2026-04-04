import jwt, { decode,  JwtPayload } from 'jsonwebtoken';
import { unauthorized } from '../utils/reseponce';
import { ADMIN_JWT, REFRESH_ADMIN_JWT, REFRESH_USER_JWT, USER_JWT } from '../../config/env.service';



interface userid {
    role: string
    _id: string
}

export const generateToken = (userID: userid) => {
  let signature: string | undefined 
  let refreshSignature: string | undefined
  let audience: string;

  switch (userID.role) {
    case 'admin':
      signature = ADMIN_JWT;
      refreshSignature = REFRESH_ADMIN_JWT;
      audience = 'admin';
      break;
    case 'user':
      signature = USER_JWT;
      refreshSignature = REFRESH_USER_JWT;
      audience = 'user';
      break;
    default:
      throw unauthorized({ message: 'invalid user role' });
  }

    const token = jwt.sign({ id: userID._id }, signature!, { expiresIn: '30m', audience: audience});
  const refreshToken = jwt.sign({ id: userID._id }, refreshSignature!, { expiresIn: '1y', audience });

  return { token, refreshToken };
};




export const decodeToken = (decode: any ,token: any)=>{
   let signature: string | undefined= undefined
    switch(decode.aud){
        case"admin": 
        signature = ADMIN_JWT
        break;

        case"user": 
        signature = USER_JWT
        break;

        default:
            throw unauthorized({message: "invalid user role"})
    
        }
        let verify = jwt.verify(token , signature!)
        return verify
}


export const decodeRefreshToken = (token: any)=>{
    let decode: any = jwt.decode(token)
    let refreshSignature: string | undefined= undefined
    switch(decode.aud){
        case"admin": 
        refreshSignature = REFRESH_ADMIN_JWT
        break;

        case"user": 
        refreshSignature = REFRESH_USER_JWT
        break;

        default:
            throw unauthorized({message: "invalid user role"})
    
        }
        let verify_refresh = jwt.verify(token , refreshSignature!)
        return verify_refresh
}
