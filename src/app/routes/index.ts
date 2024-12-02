import express from "express";
import { UserRouter } from "../modules/User/user.router";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ShopRoutes } from "../modules/Shop/shop.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/shop",
    route: ShopRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
