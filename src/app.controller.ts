import { Express  } from 'express';
import express from 'express';
import {connectDB} from './database/connection'
import { port } from './config/env.service';
import { userRouter } from './modules/auth.controller';
import { globalErrorHandler } from './common/middelware/error.middelware';
import {ai} from './common/ai-orchestrator/groq'
import { connectionRedis } from './common/service/redis';





export const boostrap = async () =>{
    const app: Express = express();

    app.use(express.json());

    app.use(ai)

    app.use(userRouter)

    app.use(globalErrorHandler)

        
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    await connectionRedis()

    await connectDB()

}
