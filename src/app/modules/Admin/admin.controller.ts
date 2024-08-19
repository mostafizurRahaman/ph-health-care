//  Get Admin Data **

import pick from "../../../shared/pick";
import { IPaginationConfig } from "../../interfaces/global";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.services";
import { adminFilterableFields } from "./admni.constsnt";

// Get All Admins
const getAdmins = catchAsync(async (req, res, next) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await adminService.getAllAdminFromDB(filter, options);

  res.status(200).json({
    success: true,
    message: "Admin Retrieved Successfully!!!",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminByID = catchAsync(async (req, res, next) => {
  const result = await adminService.getAdminByIDFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: "Admin Retrieved Successfully!!!",
    data: result,
  });
});

//  Update Admin BY ID **
const updateAdminByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await adminService.updateIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "Admin Updated Successfully!!",
    data: result,
  });
});

//  Delete Admin By ID *

const deleteAdminFromDB = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await adminService.deleteFromDBByID(id);

  res.status(200).send({
    success: true,
    message: "Admin Deleted Successfully",
    data: result,
  });
});

//  Soft Delete User **

const softDeleteAdminFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminService.softDeleteAdminFromDB(id);

  res.status(200).json({
    success: true,
    message: "Admin Deleted Successfully!!!",
    data: result,
  });
});

export const adminController = {
  getAdmins,
  getAdminByID,
  updateAdminByID,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
