import { Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admni.constsnt";
import { IPaginationConfig } from "../../interfaces/global";
import calculatePagination from "../../utils/calculatePagination";
import prisma from "../../../shared/prisma";

//   Get All Admins ** :
const getAllAdminFromDB = async (
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

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  // console.dir(whereConditions, {
  //   depth: Infinity,
  // });

  const result = await prisma.admin.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
