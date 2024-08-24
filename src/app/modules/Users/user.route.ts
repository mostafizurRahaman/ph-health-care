import { UserRole } from "@prisma/client";
import { userController } from "./user.controller";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploadHelper } from "../../helpers/fileUpload";


const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploadHelper.upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
  userController.createAdmin
);

export const userRoutes = router;
