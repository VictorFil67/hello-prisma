import { NextFunction, Request, Response } from "express";

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const ctrlWrapper = (ctrl: Controller): Controller => {
  const func: Controller = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
    next();
  };
  return func;
};

export default ctrlWrapper;
