import { UserRole } from "@prisma/client";
import { userController } from "./user.controller";
import express from "express";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
