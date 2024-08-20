import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import configs from "../../configs";
import config from "../../configs";
import comparePassword from "../../utils/comparePassword";
import { IUserLogin } from "./auth.interface";
import { createJWTToken, verifyToken } from "./auth.utils";

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
    throw new Error("You Credential Not Matched!!!");
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

export const authServices = {
  userLogin,
  refreshToken,
};
