import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function update(id: number, data: any) {
  return await prisma.post.update({
    where: { id },
    data,
  });
}

export async function deleteOnePost(id: number) {
  return await prisma.post.delete({
    where: { id },
  });
}

export async function checkIdExists(id: number) {
  return await prisma.post.findFirst({
    where: { id },
  });
}
