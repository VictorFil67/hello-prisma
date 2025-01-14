import { NextFunction, Request } from "express";
import HttpError from "../helpers/HttpError";

// type Validator = (req: Request, next: NextFunction) => Promise<HttpError>;

const validateBody = (schema: any) => {
  const func = (req: Request, _: any, next: NextFunction) => {
    const { error, value } = schema.parse(req.body);
    if (error) {
      return next(new HttpError(400, error.message));
    }
    req.body = value;
    next();
  };
  return func;
};

export default validateBody;
