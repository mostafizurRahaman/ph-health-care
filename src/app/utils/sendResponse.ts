import { Response } from "express";
import { IResponseData } from "../interfaces/global";



const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
