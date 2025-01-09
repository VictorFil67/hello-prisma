import { Request, Response } from "express";
import {
  checkIdExists,
  deleteOnePost,
  update,
} from "../services/postsServices";
import ctrlWrapper, { Controller } from "../decorators/ctrlWrapper";
import HttpError from "../helpers/HttpError";
import { error } from "console";

const updatePost: Controller = async (req: Request, res: Response) => {
  const { id, published } = req.query;

  if (typeof id !== "string") {
    console.log(id);
    // throw new HttpError(400, "Invalid or missing 'id' parameter");
    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }
  const idNum = parseInt(id);

  const existedId = await checkIdExists(idNum);
  if (!existedId) {
    res.status(404).json({ error: "Record to update not found" });
    return;
  }
  const data =
    published === "true" ? { published: true } : { published: false };
  const result = await update(idNum, data);

  res.status(200).json(result);
};

const removePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }
  const idNum = parseInt(id);

  const existedId = await checkIdExists(idNum);
  console.log(existedId);
  if (!existedId) {
    res.status(404).json({ error: "Record to delete does not exist." });
    return;
  }

  const result = await deleteOnePost(idNum);
  res.status(200).json(result);
};

export default {
  updatePost: ctrlWrapper(updatePost),
  removePost: ctrlWrapper(removePost),
};
