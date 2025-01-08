import { DefaultArgs } from "@prisma/client/runtime/library";
// import { User } from "./../types";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(): Promise<
  { name: string | null; id: number; email: string }[]
> {
  return await prisma.user.findMany();
}

export async function addUser(data: {
  select?: Prisma.UserSelect<DefaultArgs> | null | undefined;
  include?: Prisma.UserInclude<DefaultArgs> | null | undefined;
  data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
}) {
  return await prisma.user.create(data);
}
