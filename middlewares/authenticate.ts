import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/HttpError";
import "dotenv/config";
import { findUserById } from "../services/usersServices";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface UserRequest extends Request {
  user?: User;
}

const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  // console.log(authorization);
  if (!authorization) {
    //In try-catch(when next()): return, in other cases throw
    // throw new HttpError(401, "Not authorized");
    console.log("There is no authorization");
    return;
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
      name: string | undefined;
      email: string;
    };
    // console.log("id: ", payload.id);
    const user = await findUserById(payload.id);
    // console.log("user: ", user);
    if (!user || (user.accessToken !== token && user.refreshToken !== token)) {
      //In try-catch(when next()): return, in other cases throw
      return next(new HttpError(401, "Invalid token"));
    }
    const userFromToken: User = user;

    req.user = userFromToken;
    // req["user"] = { id: payload.id, name: payload.name, email: payload.email };

    console.log("req.user: ", req.user);
    next();
  } catch (error) {
    //In try-catch(when next()): return, in other cases throw
    next(new HttpError(401, "Not authorized at all"));
  }
};

export default authenticate;
