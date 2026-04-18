

 
export interface signupDTO extends loginDTO{
    name: string ,
    age: number ,
    gender: string  
}


export interface loginDTO{
    email: string ,
    password: string ,
    confirmPassword: string
}


export interface verifyDTO{
    email: string ,
    code: string
}


