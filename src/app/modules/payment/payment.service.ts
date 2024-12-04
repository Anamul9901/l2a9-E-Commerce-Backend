import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import prisma from "../../../shared/prisma";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    //   await orderModel.findOneAndUpdate(
    //     { transactionId },
    //     { paymentStatus: 'Paid' },
    //     { new: true }
    //   );

    const orderData = await prisma.order.findUniqueOrThrow({
      where: {
        transactionId,
      },
    });

    await prisma.order.update({
      where: {
        transactionId,
      },
      data: {
        paymentStatus: "paid",
      },
    });

    message = "Successfully Paid";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../../../src/public/index.html");
  console.log("filepat", filePath);
  let template = readFileSync(filePath, "utf-8");
  template = template.replace("{{message}}", message);
  template = template.replace("{{message2}}", status);

  return template;
};

export const PaymentService = {
  confirmationService,
};
