import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/HttpError";
import "dotenv/config";
import { findUserById } from "../services/usersServices";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    //In try-catch(when next()): return, in other cases throw
    throw new HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    //In try-catch(when next()): return, in other cases throw
    throw new HttpError(401, "Not authorized");
  }

  //   const verify = jwt.verify(token, JWT_SECRET);
  //   console.log("token=", verify);
  //   const id=verify.id as number
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: number;
      name: string | null;
      email: string;
    };
    console.log("id: ", payload.id);
    const user = await findUserById(payload.id);
    console.log("user: ", user);
    if (!user || (user.accessToken !== token && user.refreshToken !== token)) {
      //In try-catch(when next()): return, in other cases throw
      return next(new HttpError(401, "Invalid token"));
    }

    // @ts-ignore
    req.user = user;
    // req["user"] = { id: payload.id, name: payload.name, email: payload.email };
    // @ts-ignore
    console.log(user);
    next();
  } catch (error) {
    //In try-catch(when next()): return, in other cases throw
    next(new HttpError(401, "Not authorized"));
  }
};

export default authenticate;
