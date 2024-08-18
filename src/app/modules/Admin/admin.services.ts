import { Prisma, PrismaClient } from "@prisma/client";
import { inherits } from "util";

const prisma = new PrismaClient();

//   Get All Admins ** :
const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  console.log({
    query,
  });

  const andConditions: Prisma.AdminWhereInput[] = [];

  const adminSearchableFields = ["name", "email", "contactNumber"];
  if (query.searchTerm) {
    const searchConditions = adminSearchableFields.map((field) => ({
      [field]: {
        contains: query.searchTerm,
        mode: "insensitive",
      },
    }));

    andConditions.push({
      OR: searchConditions,
    });
  }

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  // console.dir(andConditions, {
  //   depth: Infinity,
  // });

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
