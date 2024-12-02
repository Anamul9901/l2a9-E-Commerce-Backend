import prisma from "../../../shared/prisma";

const createUser = async (payload: any) => {
  console.log("create user", payload);
  const result = await prisma.user.create({
    data: payload
  })
  return result
};

export const UserService = {
  createUser,
};
