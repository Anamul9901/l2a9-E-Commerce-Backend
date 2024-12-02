import express from "express";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.contoller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.vendor), ShopController.createShop);

export const ShopRoutes = router;
