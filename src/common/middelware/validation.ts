import type { Request  , Response  , NextFunction} from "express"
import { includes, ZodError, ZodType } from "zod"
import { BadRequest } from "../utils/reseponce"


type validationKey = keyof Request
type validationSchema = Partial<Record<validationKey , ZodType>>
export const validation = (schema: validationSchema )=> {
    let validationError: {key: validationKey , issue: ZodError['issues']}[] = []    
    return (req: Request , res:Response , next: NextFunction)=>{
     for(const key of Object.keys(schema) as validationKey[]){
        if(!schema[key]){
            continue;
        }
        const value = schema[key].safeParse(req[key])
        if(!value.success){
            validationError.push({key , issue: value.error.issues})
        }
    }
    if(validationError.length > 0){
       throw  BadRequest({message: "validation error"})
    }

    next()
}}