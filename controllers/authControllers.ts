import { Request, Response } from "express";
import { register } from "../services/authServices";
import ctrlWrapper from "../decorators/ctrlWrapper";

const signup = async (req: Request, res: Response) => {
  const { email, name, password, title, bio, content = "" } = req.body;

  //   const user = await

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

export default {
  signup: ctrlWrapper(signup),
};
