import { HttpStatus } from "http-status-ts";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user create successfully",
    data: result,
  });
});


export const UserController = {
    createUser
}
