import { Express  } from 'express';
import express from 'express';
import {connectDB} from './database/connection'
import { port } from './config/env.service';
import {globalErrorHandler} from './common/utils/reseponce/index'
import { userRouter } from './modules/auth.controller';


export const boostrap = async () =>{
    const app: Express = express();

    app.use(express.json());

    app.use(userRouter)

    await connectDB()
    
    app.use(globalErrorHandler)
    app.listen(port, () => {
        console.log('Server is running on port 3000');
    });
}