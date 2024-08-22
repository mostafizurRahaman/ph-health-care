import { UserRole } from "@prisma/client";
import { IAdmin, IAdminData, IUser } from "./user.interface";
import hashPassword from "../../utils/hashPassword";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

//  Create Users **
const createAdmin = async (payload: IAdminData) => {
  const { password, admin } = payload;

  //  Hash Password :
  const hashedPassword = await hashPassword(password, 13);
  console.log({ hashedPassword });

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

  const userData = {
    email: admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = prisma.$transaction(async (tx) => {
    //  Create User **
    const user = await tx.user.create({
      data: userData,
    });

    //  Create Admin **
    const adminData = await tx.admin.create({
      data: admin,
    });

    return {
      user,
      admin: adminData,
    };
  });

  return result;
};

export const userServices = {
  createAdmin,
};
