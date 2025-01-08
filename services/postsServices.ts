import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function update(id: number, data: any) {
  return await prisma.post.update({
    where: { id },
    data,
  });
}
