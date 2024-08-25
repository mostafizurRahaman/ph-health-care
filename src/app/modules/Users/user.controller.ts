import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


//  Create Admin **
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ file: req.file, body: req.body });
    // console.log(req?.user);
    const result = await userServices.createAdmin(req.body, req.file  );

    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Created Successfully!!!",
      data: result,
    });
  }
);


const createDoctor = catchAsync(async (req, res, next) => {
   
   const result = await userServices.createDoctor(req.body, req?.file)

 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: "Doctor Created Successfully!!!",
   data: result,
 });

})

export const userController = {
  createAdmin,
  createDoctor,
};



// 449044