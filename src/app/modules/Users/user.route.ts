import { UserRole } from "@prisma/client";
import { userController } from "./user.controller";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploadHelper } from "../../helpers/fileUpload";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

//  Create Admin
router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploadHelper.upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchema.createAdminValidationSchema),
  userController.createAdmin
);

//  Create Doctor **

router.post(
  "/create-doctor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    next();
  },
  validateRequest(userValidationSchema.createDoctor),
  userController.createDoctor
);

//  Create Patient **
router.post(
  "/create-patient",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log({
      file: req.file,
      data: JSON.parse(req.body.data),
    });
    req.body = JSON.parse(req?.body?.data);
    next();
  },
  validateRequest(userValidationSchema.createPatient),
  userController.createPatient
);

//  get All users **

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.getAllUsers
);

//  Change User Status **
router.patch(
  "/:id/status",
  validateRequest(userValidationSchema.changeUserStatus),
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.changeUserStatus
);

export const userRoutes = router;
