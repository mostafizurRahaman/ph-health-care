import { adminRoutes } from "../modules/Admin/admin.route";
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
];

routes.forEach((route) => router.use(route.path, route.route));

export const healthCareRoutes = router;
