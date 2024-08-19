import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAdmins);

router.get("/:id", adminController.getAdminByID);

router.put("/:id", adminController.updateAdminByID);

// router.delete("/:id", adminController.deleteAdminFromDB);
router.delete("/:id", adminController.softDeleteAdminFromDB);

export const adminRoutes = router;
