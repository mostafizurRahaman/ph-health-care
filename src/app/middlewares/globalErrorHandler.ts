import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message: string = err?.message || "Something Went Wrong";

  res.status(404).json({
    success: false,
    message,
    stack: err.stack,
  });
};

export default globalErrorHandler;
