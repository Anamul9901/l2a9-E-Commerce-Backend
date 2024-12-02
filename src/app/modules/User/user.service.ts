import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload: any) => {
  const hashedPassord: string = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassord;

  if(payload?.role && payload?.role == "admin"){
    payload.role = 'customer'
  }

  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};

const createAdmin = async (payload: any) => {
  const hashedPassord: string = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassord;

  payload.role = 'admin';

  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};



export const UserService = {
  createUser,
  createAdmin
};
