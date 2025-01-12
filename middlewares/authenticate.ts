import { jwt } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/HttpError";
import "dotenv/config";

const {JWT_SECRET}=process.env;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new HttpError(401, "Not authorized");
  }

  const { id } = jwt.verfy(token,JWT_SECRET);
  const user=
};
