import type { Response } from "express";

type SuccessOptions<T = null> = {
  res: Response;
  data?: T | null;
  message?: string;
  status?: number;
};

export const success = <T = null>({
  res,
  data = null,
  message = "Done",
  status = 200,
}: SuccessOptions<T>) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
