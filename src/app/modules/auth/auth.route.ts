import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authController } from "./auth.controller";

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

export const authRoutes = router;
