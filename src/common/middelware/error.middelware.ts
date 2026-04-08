import { Request, Response  , NextFunction } from "express";
import { mode } from "../../config/env.service";



export const  globalErrorHandler = (err: any, req: Request, res: Response , next: NextFunction) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack = mode === 'dev' ? err.stack : undefined ,
        cause: err.cause || undefined
    })
}