import { Request, Response } from "express";
import ctrlWrapper from "../decorators/ctrlWrapper";
import { addUser, getUsers } from "../services/usersServices";

const usersList = async (req: Request, res: Response) => {
  const result = await getUsers();
  res.status(200).json(result);
};

const createUser = async (req: Request, res: Response) => {
  const { email, name, password, title, bio, content = "" } = req.body;
  const result = await addUser({
    data: {
      email,
      name,
      password,
      posts: {
        create: { title, content },
      },
      profile: {
        create: { bio },
      },
    },
  });
  res.status(201).json(result);
};

export default {
  usersList: ctrlWrapper(usersList),
  createUser: ctrlWrapper(createUser),
};
