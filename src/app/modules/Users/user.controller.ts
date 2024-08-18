import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";

//  Create Admin **
const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Admin Created Successfully",
      data: result.admin,
    });
  } catch (err) {
    next(err);
  }
};





export const userController = {
  createAdmin,
};
