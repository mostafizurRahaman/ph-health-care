import { userController } from "./user.controller";
import express from "express";

const router = express.Router();

router.post("/", userController.createAdmin);

export const userRoutes = router;
