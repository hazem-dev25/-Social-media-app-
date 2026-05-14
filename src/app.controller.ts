import { Express  } from 'express';
import express from 'express';
import {connectDB} from './database/connection'
import { port } from './config/env.service';
import { authRouter } from './modules/auth/auth.controller';
import { globalErrorHandler } from './common/middelware/error.middelware';
import { Ai } from './modules/AI_chat/ai.controller';
import { connectionRedis } from './common/service/redis';
import {userRouter} from './modules/users/user.controller'




export const boostrap = async () =>{
    const app: Express = express();

    app.use(express.json());

   
   app.use('/public/images', express.static('public/images'))
   app.use('/public/audio', express.static('public/audio'))

    app.use(Ai)
    app.use(authRouter)
    app.use(userRouter)
    app.use(globalErrorHandler)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    await connectionRedis()
    await connectDB()
}