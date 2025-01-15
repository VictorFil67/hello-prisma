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
const deleteUsersFromRange = async (req: Request, res: Response) => {
  const { smallId, bigId } = req.params;
  // console.log("ID in controller: ", id);
  // console.log("typeof id: ", typeof id);
  // console.log("id: ", id);
  if (typeof smallId !== "string" || typeof bigId !== "string") {
    res.status(415).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }
  const smallIdNum = Number(smallId);
  const bigIdNum = Number(bigId);
  // console.log("idNum: ", idNum);
  // console.log("typeof idNum: ", typeof idNum);
  const result = await deleteUsersFromDB(smallIdNum, bigIdNum);
  res.json(result);
};

export default {
  usersList: ctrlWrapper(usersList),
  createUser: ctrlWrapper(createUser),
  deleteUser: ctrlWrapper(deleteUser),
  deleteUsers: ctrlWrapper(deleteUsersFromRange),
};
