import express from "express";
import { UserRouter } from "../modules/User/user.router";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ShopRoutes } from "../modules/Shop/shop.router";
import { ProductRoutes } from "../modules/Product/product.router";
import { FollowerRoutes } from "../modules/FollowUnfollow/follow.router";
import { RecentProductRoutes } from "../modules/RecentProduct/recentPro.router";

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
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/",
    route: FollowerRoutes,
  },
  {
    path: "/recent-product-view",
    route: RecentProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
