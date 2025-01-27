// import { PrismaClient } from "@prisma/client";
// const { hashSync } = require("bcrypt");
import bcrypt from "bcrypt";
import { UserCreateInput, UserSetTokens } from "../types";
import { prisma } from "../helpers/prisma";

// const prisma = new PrismaClient();

export async function register(data: UserCreateInput) {
  const { password } = data;

  const hashPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    // data: { ...rest, password: hashPassword },
    data: { ...data, password: hashPassword },
  });
}

export function setTokens(
  id: number,
  accessToken: string | null = null,
  refreshToken: string | null = null
) {
  return prisma.user.update({
    where: { id },
    data: { accessToken, refreshToken }, //pass an object with the necessary fields
  });
}
