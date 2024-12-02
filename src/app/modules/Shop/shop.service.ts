import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createShop = async (user: any, payload: any) => {
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

const getAllShop = async () => {
  const result = await prisma.shop.findMany({
    where: {
      isDeleted: false,
    },
    //    select: {
    //     id: true,
    //     name: true,
    //     title: true,
    //     userId: true,
    //     logo: true,
    //     followers: true,
    //    }
  });

  return result;
};

const getById = async (id: string) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result
};

export const ShopService = {
  createShop,
  getAllShop,
  getById,
};
