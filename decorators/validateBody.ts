import { z } from "zod";
import { NextFunction, Request } from "express";
import HttpError from "../helpers/HttpError";

// type Validator = (req: Request, next: NextFunction) => Promise<HttpError>;

const validateBody = (schema: z.ZodSchema) => {
  //you need to pass the zod schema itself to validateBody not a type
  const func = (req: Request, _: any, next: NextFunction) => {
    // console.log(typeof req.body);
    // const { error } = schema.parse(req.body);
    try {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.errors);
        return next(
          new HttpError(
            400,
            ` ${err.errors[0]?.path[0]?.toString()} ${
              err.errors[0]?.message
            }` || "Invalid data"
          )
        );
      }
      next(err);
    }
    // console.log("schema.parse(req.body): ", schema.parse(req.body));
  };
  return func;
};

export default validateBody;
