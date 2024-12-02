import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import sendResponse from "../../../shared/sendResponse";
import { ShopService } from "./shop.service";

const createShop = catchAsync(async (req, res) => {
  const user = (req as any).user 
  const result = await ShopService.createShop(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Shop create successfully",
    data: result,
  });
});

export const ShopController = {
  createShop,
};
