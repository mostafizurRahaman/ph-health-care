import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchableFields } from "./admni.constsnt";
import { IPaginationConfig } from "../../interfaces/global";
import calculatePagination from "../../utils/calculatePagination";
import prisma from "../../../shared/prisma";

//   Get All Admins ** :
const getAllAdminFromDB  = async (
  query: Record<string, unknown>,
  options: IPaginationConfig
) => {
  const { searchTerm, ...filterData } = query;
  const { limit, page, sortBy, sortOrder, skip } = calculatePagination(options);

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    const searchConditions = adminSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));

    andConditions.push({
      OR: searchConditions,
    });
  }

  if (filterData && Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData)?.map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  //  Count Admins
  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};

// ** Get Admin By ID **
const getAdminByIDFromDB = async (id: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return admin;
};

//  ** Update Into DB **
const updateIntoDB = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin | null> => {
  //  IsUserExists **
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.update({
    data,
    where: {
      id,
    },
  });
  return result;
};

// ** Delete Admin By  ID **

const deleteFromDBByID = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  //  Transaction --> For User + Admin Deletion :
  const result = await prisma.$transaction(async (tx) => {
    //  Admin Delete**
    const admin = await tx.admin.delete({
      where: {
        id,
      },
    });

    //   User Delete **

    await tx.user.delete({
      where: {
        email: admin?.email,
      },
    });

    return admin;
  });

  return result;
};

//  Soft Delete user **

const softDeleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    //  Update IsDelete of  Admin = true **
    const admin = await tx.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    //  Update  user Status of User Active to deleted **
    await tx.user.update({
      where: {
        email: admin?.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return admin;
  });

  return result;
};

export const adminService = {
  getAllAdminFromDB,
  getAdminByIDFromDB,
  updateIntoDB,
  deleteFromDBByID,
  softDeleteAdminFromDB,
};
