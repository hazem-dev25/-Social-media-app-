import { Express  } from 'express';
import express from 'express';
import {connectDB} from './database/connection'
import { port } from './config/env.service';
import { userRouter } from './modules/auth.controller';
import { globalErrorHandler } from './common/middelware/error.middelware';


export const boostrap = async () =>{
    const app: Express = express();

    app.use(express.json());

    app.use(userRouter)

    app.use(globalErrorHandler)

    await connectDB()
    

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
