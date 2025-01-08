import { Request, Response } from "express";
import { update } from "../services/postsServices";
import ctrlWrapper, { Controller } from "../decorators/ctrlWrapper";

const updatePost: Controller = async (req: Request, res: Response) => {
  const { id, published } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }
  const idNum = parseInt(id);
  const data =
    published === "true" ? { published: true } : { published: false };
  const result = await update(idNum, data);

  res.status(200).json(result);
};

export default {
  updatePost: ctrlWrapper(updatePost),
};
