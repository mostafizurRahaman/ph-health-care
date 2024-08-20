import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidations } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAdmins);

router.get("/:id", adminController.getAdminByID);

router.put(
  "/:id",
  validateRequest(adminValidations.updateAdminValidation),
  adminController.updateAdminByID
);

// router.delete("/:id", adminController.deleteAdminFromDB);
router.delete("/:id", adminController.softDeleteAdminFromDB);

export const adminRoutes = router;
