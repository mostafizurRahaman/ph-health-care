import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.json({
    message: `So Sad!! 🥹 Route Not Found!!!`,
  });
};


export default notFound; 