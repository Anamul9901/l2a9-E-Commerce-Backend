import express from "express";
import { CartController } from "./cart.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.customer, UserRole.admin, UserRole.vendor),
  CartController.createCart
);

router.post(
  "/reduce-quantity",
  auth(UserRole.customer, UserRole.admin, UserRole.vendor),
  CartController.reduceCartItemQuantity
);

router.delete("/:id", CartController.deleteCartItem);

export const CartRouter = router;
