import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createShop = async (user: any, payload: any) => {
    console.log(user)
  const vendorData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      role: UserRole.vendor,
      status: UserStatus.active,
    },
  });

  const result = await prisma.shop.create({
    data: { ...payload, userId: vendorData.id },
  });
  return result;
};

export const ShopService = {
  createShop,
};
