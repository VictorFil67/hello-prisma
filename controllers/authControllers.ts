import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { register, setTokens } from "../services/authServices";
import ctrlWrapper from "../decorators/ctrlWrapper";
import {
  findUserByEmail,
  findUserById,
  findUserWithoutPassword,
} from "../services/usersServices";
import HttpError from "../helpers/HttpError";
import "dotenv/config";
import { UserRequest } from "../middlewares/authenticate";

const JWT_SECRET = process.env.JWT_SECRET as string;

const signup = async (req: Request, res: Response) => {
  const { email, name, password, title, bio, content = "" } = req.body;
  // console.log(JWT_SECRET);
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

  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(401, "Email is wrong");
  }
  const { password: hashPassword, id } = user;
  const compare = await bcrypt.compare(password, hashPassword);
  // console.log(compare);
  if (!compare) {
    throw new HttpError(401, "Password is wrong");
  }

  const payload = { id, email };
  // console.log(JWT_SECRET);
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  //   res.json(accessToken);

  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  const data = { accessToken, refreshToken };

  await setTokens(id, accessToken, refreshToken);
  const result = await findUserWithoutPassword(id);

  res.json(result);
};

const getCurrent = async (req: UserRequest, res: Response) => {
  if (req.user) {
    const { id, ...userWithoutPassword } = req.user;
  } else {
    throw new HttpError(401, "User is not authenticated");
  }

  const { password, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
};

const logout = async (req: UserRequest, res: Response) => {
  const user = req.user;
  // const data = { accessToken: null, refreshToken: null };
  await setTokens(user!.id);
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
