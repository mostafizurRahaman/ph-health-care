import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message: string = err?.message || "Something Went Wrong";
  const statusCode: number =
    err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: err.stack,
  });
};

export default globalErrorHandler;
