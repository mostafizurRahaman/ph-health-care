//  Get Admin Data **

import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.services";

const getAdmins = catchAsync(async (req, res, next) => {
  const result = await adminService.getAllAdminFromDB(req.query);

  res.status(200).json({
    success: true,
    message: "Admin Retrieved Successfully!!!",
    data: result,
  });
});

export const adminController = {
  getAdmins,
};
