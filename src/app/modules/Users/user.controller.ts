import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

//  Create Admin **
const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created Successfully!!!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await userServices.createDoctor(req.body, req?.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Created Successfully!!!",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await userServices.createPatient(req.body, req?.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created Successfully!!!",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
};
