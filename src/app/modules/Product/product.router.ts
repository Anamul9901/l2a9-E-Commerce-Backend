import express from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.vendor), ProductController.createProduct);

export const ProductRoutes = router;
