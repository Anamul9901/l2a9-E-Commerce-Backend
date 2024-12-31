"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.vendor), product_controller_1.ProductController.createProduct);
router.get("/", product_controller_1.ProductController.getAllProduct);
router.get("/:id", product_controller_1.ProductController.getById);
router.get("/shop-product/:shopId", product_controller_1.ProductController.getProductsByShopId);
router.get("/vendor/myproduct", (0, auth_1.default)(client_1.UserRole.vendor), product_controller_1.ProductController.getMyProduct);
router.delete("/soft/:id", (0, auth_1.default)(client_1.UserRole.vendor, client_1.UserRole.admin), product_controller_1.ProductController.softDelete);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.admin), product_controller_1.ProductController.deleteProduct);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.vendor), product_controller_1.ProductController.updateProduct);
exports.ProductRoutes = router;