import { adminRoutes } from "../modules/Admin/admin.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/Users/user.route";
import express from "express";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const healthCareRoutes = router;
