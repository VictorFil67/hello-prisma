import { DefaultArgs } from "@prisma/client/runtime/library";
// import { User } from "./../types";
import { Prisma } from "@prisma/client";
import { UserWithoutPassword } from "../types";
import { prisma } from "../helpers/prisma";

export async function getUsers(): Promise<
  { name: string | null; id: number; email: string }[]
> {
  return await prisma.user.findMany({ orderBy: { id: "asc" } });
}

export async function addUser(data: {
  select?: Prisma.UserSelect<DefaultArgs> | null | undefined;
  include?: Prisma.UserInclude<DefaultArgs> | null | undefined;
  data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
}) {
  return await prisma.user.create(data);
}

export async function update(id: number, data: Boolean) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: { email },
  });
}

export async function findUserById(
  id: number,
  includeRelations: boolean = false
) {
  return await prisma.user.findFirst({
    where: { id },
    include: includeRelations ? { posts: true, profile: true } : undefined,
  });
}

export async function findUserWithoutPassword(
  id: number
): Promise<UserWithoutPassword | null> {
  //Works without return type too
  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user) {
    return null;
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function deleteUserFromDB(id: number) {
  await prisma.post.deleteMany({
    where: { authorId: id },
  });
  await prisma.profile.deleteMany({
    where: { userId: id },
  });
  await prisma.user.delete({
    where: { id },
  });
}

export async function deleteUsersFromDB(smallId: number, bigId: number) {
  // console.log("ID: ", id);
  // const numericId = Number(id);
  // console.log("typeof numericId: ", typeof numericId);
  // console.log("ID for Prisma query:", numericId);
  // if (isNaN(numericId)) {
  //   throw new Error("Invalid ID value. It must be a number.");
  // }
  await prisma.post.deleteMany({
    where: {
      AND: [{ authorId: { gte: smallId } }, { authorId: { lte: bigId } }],
    },
  });
  await prisma.profile.deleteMany({
    where: { AND: [{ userId: { gte: smallId } }, { userId: { lte: bigId } }] },
  });
  return await prisma.user.deleteMany({
    where: { AND: [{ id: { gte: smallId } }, { id: { lte: bigId } }] },
  });
}

// function id(
//   a: {
//     id: number;
//     email: string;
//     password: string;
//     name: string | null;
//     accessToken: string | null;
//     refreshToken: string | null;
//   },
//   b: {
//     id: number;
//     email: string;
//     password: string;
//     name: string | null;
//     accessToken: string | null;
//     refreshToken: string | null;
//   }
// ): number {
//   throw new Error("Function not implemented.");
// }
