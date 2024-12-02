import express from "express";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.contoller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.vendor), ShopController.createShop);

router.get("/", ShopController.getAllShop);

router.get("/:id", ShopController.getById);

router.delete("/soft/:id", ShopController.softDelete);

router.delete("/:id", ShopController.deleteShop);

export const ShopRoutes = router;
