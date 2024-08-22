import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import configs from "../../configs";
import config from "../../configs";
import comparePassword from "../../utils/comparePassword";
import { IUserLogin } from "./auth.interface";
import { createJWTToken, verifyToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IReqUser } from "../../interfaces/global";
import { UserRole, UserStatus } from "@prisma/client";
import hashPassword from "../../utils/hashPassword";

//  User Login **
const userLogin = async (payload: IUserLogin) => {
  //  IS User Exists  **
  const user = await prisma.user?.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: "ACTIVE",
    },
  });

  //  Password Validation **
  const isPasswordMatched = await comparePassword(
    payload.password,
    user.password
  );

  // check   Is Password Matched **
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "You Credential Not Matched!!!");
  }

  const payloadData = {
    email: payload.email,
    role: user.role,
  };

  const accessToken = createJWTToken(
    payloadData,
    config.access_secret as string,
    config.access_token_expiresIn as string
  );

  const refreshToken = createJWTToken(
    payloadData,
    config.refresh_secret as string,
    config.refresh_token_expiresIn as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const refreshToken = async (refreshToken: string) => {
  const decodedData = verifyToken(
    refreshToken,
    configs.refresh_secret as string
  ) as JwtPayload;

  //  Check Is User Exists  with Payload Email **

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: "ACTIVE",
    },
  });

  const payloadData = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createJWTToken(
    payloadData,
    configs.access_secret as string,
    configs.access_token_expiresIn as string
  );

  return { accessToken };
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  user?: any
) => {
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      role: user?.role,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordCorrect = await comparePassword(
    oldPassword,
    isUserExists?.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
  }

  const password = await hashPassword(
    newPassword,
    Number(configs.bcrypt_slat_round) as number
  );

  const updatedUser = await prisma.user.update({
    where: {
      email: isUserExists?.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password,
      needsPasswordChange: false,
    },
  });

  return updatedUser;
};

const forgotPassword = async (email: string) => {
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const userPayload = {
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const resetToken = createJWTToken(
    userPayload,
    configs.reset_password_secret as string,
    configs.reset_expires_in as string
  );

  const resetPassLink = `${config.reset_password_link}?email=${isUserExists?.email}&token=${resetToken}`;

  return resetPassLink;
};
export const authServices = {
  userLogin,
  refreshToken,
  changePassword,
  forgotPassword,
};
