import { Doctor, Prisma, UserRole, UserStatus } from "@prisma/client";
import {
  IAdmin,
  IAdminData,
  IDoctorData,
  IPaitentData,
  IUser,
} from "./user.interface";
import hashPassword from "../../utils/hashPassword";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { fileUploadHelper } from "../../helpers/fileUpload";
import { Multer } from "multer";
import { UploadApiResponse } from "cloudinary";
import configs from "../../configs";
import { IPaginationOptions } from "../../interfaces/pagination";
import calculatePagination from "../../utils/calculatePagination";
import { userSearchableFields } from "./user.constraint";

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
  if (file) {
    const imageName = admin.email?.split("@")[0];
    const { secure_url } = (await fileUploadHelper.sendImageToCloudinary(
      imageName,
      file.path
    )) as UploadApiResponse;
    admin.profilePhoto = secure_url;
  }

  const userData = {
    email: admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = prisma.$transaction(async (tx) => {
    //  Create User **
    await tx.user.create({
      data: userData,
    });

    //  Create Admin **
    const adminData = await tx.admin.create({
      data: { ...admin },
    });

    return adminData;
  });

  return result;
};

const createDoctor = async (payload: IDoctorData, file: any) => {
  const { doctor, password } = payload;

  //  Check Is Doctor Exists With this email:
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: doctor?.email,
    },
  });

  if (isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Already Exists With This ID!!!"
    );
  }

  //  Generate hash Password **
  const hashedPassword = await hashPassword(
    password,
    Number(configs.bcrypt_slat_round) as number
  );

  //  Necessary Data To Create A User **
  const userData = {
    email: doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  //  Get User Profile Image Link **
  if (file) {
    const imageName = doctor?.email?.split("@")[0];
    const { secure_url } = await fileUploadHelper.sendImageToCloudinary(
      imageName,
      file?.path
    );
    doctor.photoProfile = secure_url;
  }

  const result = await prisma.$transaction(async (tx) => {
    //  Create User **
    await tx.user.create({
      data: {
        ...userData,
      },
    });

    //  Create Doctor**
    const doctorData = await tx.doctor.create({
      data: { ...doctor },
    });

    return doctorData;
  });

  return result;
};

const createPatient = async (payload: IPaitentData, file: any) => {
  const { patient, password } = payload;

  //  Check Is User Exists With This Email ??
  const isPatientExists = await prisma.user.findUnique({
    where: {
      email: patient?.email,
    },
  });

  if (isPatientExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exits With This ID"
    );
  }

  //  Generate hashed Password **
  const hashedPassword = await hashPassword(
    password,
    Number(configs.bcrypt_slat_round) as number
  );

  //  User Payload :
  const userData = {
    email: patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  //  Upload Profile Image For Patients **
  if (file) {
    const imageName = patient.email?.split(" ")[0];
    const { secure_url } = await fileUploadHelper.sendImageToCloudinary(
      imageName,
      file?.path
    );

    patient.photoProfile = secure_url;
  }

  //  Create Paitent Into Database with User **
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        ...userData,
      },
    });

    const patientData = await tx.patient.create({
      data: {
        ...patient,
      },
    });

    return { patientData, user };
  });

  return result;
};

//  Get All Users From DB **

const getAllUsersFromDB = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filters } = params;
  const { limit, sortBy, sortOrder, skip, page } = calculatePagination(options);

  //  And Conditions *
  const andConditions: Prisma.UserWhereInput[] = [];

  //  Search Terms Calculation ::
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((item) => ({
        [item]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  console.log(filters);
  // FilterAble Fields **
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map((key) => ({
        [key]: {
          equals: filters[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput = {
    AND: andConditions,
  };
  console.dir(whereConditions, { depth: "infinity" });

  const data = await prisma.user.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    select: {
      id: true,
      email: true,
      status: true,
      role: true,
      needsPasswordChange: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      doctor: true,
      patient: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  const meta = {
    limit,
    page,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return {
    meta,
    data,
  };
};

const changeProfileStatus = async (
  id: string,
  payload: { status: UserStatus }
) => {
  console.log({
    id,
    payload,
  });

  await prisma.user.findUniqueOrThrow({
    where: {
      id
     }
  })

  const result = await prisma.user.update({
    where: {
       id
    },
    data: {
       status : payload.status
    }
  })

  return  result
};

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsersFromDB,
  changeProfileStatus,
};
