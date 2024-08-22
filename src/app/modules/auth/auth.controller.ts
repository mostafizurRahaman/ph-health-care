import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import config from "../../configs";

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

const changedPassword = catchAsync(async (req, res) => {
  // @ts-ignore
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
});

export const authController = {
  Login,
  refreshToken,
  changedPassword,
};
