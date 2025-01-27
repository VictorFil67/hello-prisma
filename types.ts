// import type { Prisma } from "@prisma/client";

export interface User {
  id: number;
  name?: string | null;
  email: string;
  password: string;
  posts?: Post[];
  profile?: Profile | undefined;
}

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
  accessToken: string | null;
  refreshToken: string | null;
};

// export type UserWithoutPassword = Omit<Prisma.UserGetPayload<true>, "password">;
export type UserWithoutPassword = {
  id: number;
  name?: string | null;
  email: string;
  posts?: Post[];
  profile?: Profile | undefined;
};
