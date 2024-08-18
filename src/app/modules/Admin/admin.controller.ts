//  Get Admin Data **

import pick from "../../../shared/pick";
import { IPaginationConfig } from "../../interfaces/global";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.services";
import { adminFilterableFields } from "./admni.constsnt";

const getAdmins = catchAsync(async (req, res, next) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log({ filter, options });
  const result = await adminService.getAllAdminFromDB(filter, options);

  res.status(200).json({
    success: true,
    message: "Admin Retrieved Successfully!!!",
    data: result,
  });
});

export const adminController = {
  getAdmins,
};
