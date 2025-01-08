import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(): Promise<
  { name: string | null; id: number; email: string }[]
> {
  return await prisma.user.findMany();
}
