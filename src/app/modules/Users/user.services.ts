


import { UserRole } from "@prisma/client";
import { IAdmin, IAdminData, IUser } from "./user.interface";
import hashPassword from "../../utils/hashPassword";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { fileUploadHelper } from "../../helpers/fileUpload";
import { Multer } from "multer";
import { UploadApiResponse } from "cloudinary";

//  Create Users **
const createAdmin = async (payload: IAdminData, file: any) => {
  const { password, admin } = payload;

  //  Hash Password :
  const hashedPassword = await hashPassword(password, 13);
  // console.log({ hashedPassword });

  const isExists = await prisma.user.findUnique({
    where: {
      email: admin.email,
    },
  });

  if (isExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exists With This Email!!!"
    );
  }

  //  Image Upload :
  const imageName = admin.email?.split("@")[0];
  const { secure_url } = (await fileUploadHelper.sendImageToCloudinary(
    imageName,
    file.path
  )) as UploadApiResponse;

  const userData = {
    email: admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  console.log(secure_url);

  const result = prisma.$transaction(async (tx) => {
    //  Create User **
    await tx.user.create({
      data: userData,
    });

    //  Create Admin **
    const adminData = await tx.admin.create({
      data: {...admin, photoProfile: secure_url},
    });
    

    return adminData;
  });

  return result;
};

export const userServices = {
  createAdmin,
};
