import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await ProductService.createProduct(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "admin create successfully",
    data: result,
  });
});

const getAllShop = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const softDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = (req as any).user;
  const result = await ProductService.softDelete(user, id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Shop deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllShop,
  getById,
  softDelete,
  deleteProduct,
};
