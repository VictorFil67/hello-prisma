import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function update(id: number, data: Boolean) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}
