import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

//  Create Admin **
const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdmin(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
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
