import express from 'express';
import  type { Express , Request , Response } from 'express';


type user =  {
    id: number
    name: string 
    age: number 
    email : string 
    password: string
}

export const boostrap = async () =>{
    const app: Express = express();

    app.use(express.json());

    const Users : user[]  = [{ id :1,name: "hazem" , age: 34 ,email: "hadel6464@gmail.com" , password: "hasg"}] 
    
    app.post('/add_user' ,  (req: Request , res:Response)=>{
       let{ name , age , email , password} = req.body
       let id = Users.length + 1
        let isExsist = Users.find(user => user.email === email)
        if(isExsist){
            res.json({message: "the user is Already exist"})
        }
        Users.push({id ,name ,age , email , password})

       res.json({Users , message: "user added succssful"})
    })

    app.patch('/update_user/:id' , (req:Request , res: Response)=>{
        let {name} = req.body
        let {id} = req.params
        let userData: any = Users.findIndex(u => u.id === Number(id))
        if(userData === -1){
            res.json({message: "the user is not exist"})
        }
        let user: any = Users[userData]
        console.log(user)
        user.name = name
        res.json({Users , message: "user updated succssful"})
    })

    app.delete('/delete_user/:id' , (req:Request , res: Response)=>{
        let {id} = req.params
        let userData: any = Users.findIndex(u => u.id === Number(id))   
        if(userData === -1){
            res.json({message: "the user is not exist"})
        }
        Users.splice(userData, 1)
        res.json({Users , message: "user deleted succssful"})
    })


    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

}