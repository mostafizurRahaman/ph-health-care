import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";

//  Create Admin **
const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdmin(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin Created Successfully!!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createAdmin,
};
