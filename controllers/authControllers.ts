import { Request, Response } from "express";
import { register } from "../services/authServices";
import ctrlWrapper from "../decorators/ctrlWrapper";
import { findUserByEmail } from "../services/usersServices";
import HttpError from "../helpers/HttpError";

const signup = async (req: Request, res: Response) => {
  const { email, name, password, title, bio, content = "" } = req.body;

  const user = await findUserByEmail(email);
  if (user) {
    throw new HttpError(409, "This email is already in use");
  }
  //
  const result = await register({
    email,
    name,
    password,
    posts: {
      create: { title, content },
    },
    profile: {
      create: { bio },
    },
  });
  res.status(201).json(result);
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
};

export default {
  signup: ctrlWrapper(signup),
};
