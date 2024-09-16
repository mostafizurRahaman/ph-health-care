import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constraint";

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

const getAllUsers = catchAsync(async (req, res, next) => {
  const query = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log({ query, options });

  const result = await userServices.getAllUsersFromDB(query, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User Retrieved Successfully!!!",
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User Retrieved Successfully!!!",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user;
  const result = await userServices.getMyProfile(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My  Profile Retrieved Successfully!!!!!!",
    data: result,
  });
});
const updateMyProfile = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;
    const result = await userServices.updateMyProfile();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My  Profile Updated Successfully!!!!!!",
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  changeUserStatus,
  getMyProfile,
  updateMyProfile,
};
