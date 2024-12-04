import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";

const confirmationService = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await PaymentService.confirmationService(
    transactionId as string,
    status as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment confirmation successfully",
    data: result,
  });
});

export const PaymentController = {
  confirmationService,
};
