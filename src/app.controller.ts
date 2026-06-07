import { Express } from "express";
import express from "express";
import { connectDB } from "./database/connection";
import { port } from "./config/env.service";
import { authRouter } from "./modules/auth/auth.controller";
import { globalErrorHandler } from "./common/middelware/error.middelware";
import { Ai } from "./modules/AI_chat/ai.controller";
import { connectionRedis } from "./common/service/redis";
import { userRouter } from "./modules/users/user.controller";
import { commentRouter } from "./modules/comments/comments.controller";
import { postRouter } from "./modules/posts/post.controller";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./modules/GraphQl";

export const boostrap = async () => {
  const app: Express = express();

  app.use(express.json());

  app.use("/public/images", express.static("public/images"));
  app.use("/public/audio", express.static("public/audio"));

  app.use(Ai);
  app.use(authRouter);
  app.use(userRouter);
  app.use(postRouter);
  app.use(commentRouter);
  app.use(globalErrorHandler);

  app.use("/qraphql", createHandler({ schema: schema }));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  await connectionRedis();
  await connectDB();
};
