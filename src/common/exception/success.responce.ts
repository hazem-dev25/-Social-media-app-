import { Response } from "express"



export const SuccessResponse = ({ res, message = 'Success', data, status = 200 }: { res: Response, message: string, data?: any, status?: number }) => {
    return res.status(status).json({
        status: 'success',
        message,
        data
    })}