import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authController } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidations.loginValidation),
  authController.Login
);

router.post(
  "/refresh-token",
  validateRequest(authValidations.refreshToken),
  authController.refreshToken
);

router.post(
  "/changed-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  validateRequest(authValidations.changePasswordValidationSchema),
  authController.changedPassword
);
router.post(
  "/forgot-password",
  // validateRequest(authValidations.changePasswordValidationSchema),
  authController.forgetPassword
);


router.post('/reset-password', authController.resetPassword)

export const authRoutes = router;
