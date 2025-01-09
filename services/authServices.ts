import { PrismaClient } from "@prisma/client";
// const { hashSync } = require("bcrypt");
import bcrypt from "bcrypt";

// import { User } from "../types";

const prisma = new PrismaClient();

type UserCreateInput = {
  name: string | undefined;
  email: string;
  password: string;
  posts: {
    create: { title: string; content: string };
  };
  profile: {
    create: { bio: string };
  };
};
export async function register(data: UserCreateInput) {
  const { password, ...rest } = data;
  // const hashPassword = hashSync(password, 10);
  const hashPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { ...rest, password: hashPassword },
  });
}
