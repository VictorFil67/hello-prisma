import { Request, Response } from "express";
import ctrlWrapper from "../decorators/ctrlWrapper";
import {
  addUser,
  deleteUserFromDB,
  deleteUsersFromDB,
  getUsers,
} from "../services/usersServices";
import HttpError from "../helpers/HttpError";

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

const deleteUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.user;
  console.log("typeof id: ", typeof id);
  const result = await deleteUserFromDB(id);
  res.json(result);
};
const deleteUsers = async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.params;
  console.log("typeof id: ", typeof id);
  if (typeof id !== "string") {
    res.status(415).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }
  const idNum = parseInt(id);
  const result = await deleteUsersFromDB(idNum);
  res.json(result);
};

export default {
  usersList: ctrlWrapper(usersList),
  createUser: ctrlWrapper(createUser),
  deleteUser: ctrlWrapper(deleteUser),
  deleteUsers: ctrlWrapper(deleteUsers),
};
