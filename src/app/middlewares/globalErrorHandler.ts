import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message: string = err?.name || "Something Went Wrong";

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    stack: err.stack,
  });
};

export default globalErrorHandler;
