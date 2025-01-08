export type User = {
  name: String | undefined;
  email: String;
  posts: Post[];
  profile: Profile | undefined;
};

type Post = {
  createdAt: Date;
  updatedAt: Date;
  title: String;
  content: String;
  published: Boolean;
  authorId: Number;
};

type Profile = {
  bio: String;
  userId: Number;
};
