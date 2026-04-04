import { NextFunction  , Response ,Request} from "express";
import { mood } from "../../../config/env.service";

export const ErrorResponse = ({message = "Error", status = 400 , extra = undefined} = {}) => {
    throw new Error(message , {cause: {status , extra}});
}

export const BadRequest = ({ message = "Bad Request" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 400 , extra});
}


export const NotFound = ({ message = "Not Found" ,extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 404 , extra});
}


export const Conflict = ({ message = "Conflict" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 409 ,extra});
}


export const forbidden = ({ message = "Forbidden" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 403 , extra});
}



export const unauthorized = ({ message = "Unauthorized" , extra = undefined} = {}) => {
  return ErrorResponse({ message, status: 401 , extra});
}




type AppError = Error & { cause?: { status?: number; extra?: any } };

export const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.cause?.status || 500;
  const extra = error.cause?.extra || null;

  res.status(status).json({
    status,
    errorMessage: error.message || "Something went wrong",
    extra,
    stack: mood === "dev" ? error.stack : null,
  });
};
