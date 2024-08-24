import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import config from "../../configs";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

const Login = catchAsync(async (req, res) => {
  const { refreshToken, ...others } = await authServices.userLogin(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 365 * 24 * 60 * 60 * 100, // Convert Year to milliseconds
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Log In Successfully!!!",
    data: {
      ...others,
    },
  });
});

//  Generate Access Token By Using RefreshToken :

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const result = await authServices.refreshToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token Generated Successfully!!!",
    data: result,
  });
});

const changedPassword = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await authServices.changePassword(
      oldPassword,
      newPassword,
      user
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Changed Sucessfully!!!",
      data: null,
    });
  }
);

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authServices.forgotPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Check Your Email!!!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  await authServices.resetPassword(token as string, req.body);

  sendResponse(res, { 
    statusCode: httpStatus.OK, 
    success: true, 
    message: 'Password Reset Successfully!!!', 
    data: null
  })
});

export const authController = {
  Login,
  refreshToken,
  changedPassword,
  forgetPassword,
  resetPassword,
};
