import { Prisma } from "@prisma/client";

export type User = {
  name: string | undefined;
  email: string;
  password: string;
  posts: Post[];
  profile: Profile | undefined;
};

type Post = {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
};

type Profile = {
  bio: string;
  userId: number;
};

export type UserCreateInput = {
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

export type UserSetTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthenticatedUser = {
  id: number;
  email: string;
  name: string | null;
};

export type UserWithoutPassword = Omit<Prisma.UserGetPayload<true>, "password">;
