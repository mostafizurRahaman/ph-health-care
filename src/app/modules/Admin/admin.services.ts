import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//   Get All Admins ** :
const getAllAdminFromDB = async () => {
  const result = await prisma.admin.findMany({});

  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
