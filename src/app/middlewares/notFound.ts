import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  console.log(req);
  res.json({
    success: false,
    message: `API Route Not Found!!!`,
    err: {
      method: req.method,
      path: req.originalUrl,
      message: `Your Provided Route Not Found`,
    },
  });
};

export default notFound;
