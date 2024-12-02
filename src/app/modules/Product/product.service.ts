import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createProduct = async (user: any, payload: any) => {
  const vendorData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const shopData = await prisma.shop.findUniqueOrThrow({
    where: {
      userId: vendorData.id,
      isDeleted: false,
    },
  });

  const result = await prisma.product.create({
    data: { ...payload, userId: vendorData.id, shopId: shopData.id },
  });

  return result;
};

export const ProductService = {
  createProduct,
};
