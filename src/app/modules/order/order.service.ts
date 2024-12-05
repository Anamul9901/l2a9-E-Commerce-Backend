import prisma from "../../../shared/prisma";
import { initiatePayment } from "../payment/payment.utils";

const createOrder = async (user: any, orderData: any) => {
  const { name, email, contactNumber, address } = orderData;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  // cart information
  const cartInfo = await prisma.cart.findUniqueOrThrow({
    where: {
      userId: userData.id,
    },
    include: {
      cartItem: true,
    },
  });

  const totalSum = cartInfo?.cartItem.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const createOrder = await prisma.order.create({
    data: {
      user: {
        name: name || userData.name,
        email: userData.email,
        contactNumber: contactNumber || userData?.contactNumber,
        address: address || userData?.address,
      },
      totalPrice: totalSum,
      productInfo: cartInfo,
    },
  });

  const paymentData = {
    transactionId: createOrder.transactionId,
    totalPrice: createOrder.totalPrice,
    customerName: name || userData.name,
    customerEmail: userData.email,
    customerPhone: contactNumber || userData?.contactNumber,
    customerAddress: address || userData?.address,
  };

  //Payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const getAllOrder = async () => {
  const result = await prisma.order.findMany();
  return result;
};

const getOrderForCustomer = async (user: any) => {
  const result = await prisma.order.findMany({
    where: {
      user: {
        path: ["email"],
        equals: user.email,
      },
    },
  });

  return result;
};

const getOrderForVendor = async (vendorId: string) => {
  const orders = await prisma.order.findMany();
  const result = orders.filter((order) => {
    const productInfo = order.productInfo as any;
    return productInfo.vendorId === vendorId;
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getOrderForCustomer,
  getOrderForVendor,
};
