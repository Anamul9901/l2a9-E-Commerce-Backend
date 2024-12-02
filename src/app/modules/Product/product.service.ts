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

const getAllProduct = async () => {
  const result = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
  });

  return result;
};

const getById = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const softDelete = async (user: any, id: string) => {
    console.log(user, id)
  const vendorData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active
    },
  });

  await prisma.product.findUniqueOrThrow({
    where: {
      id,
      userId: vendorData.id,
    },
  });

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await prisma.product.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getById,
  softDelete,
  deleteProduct,
};
