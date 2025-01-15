import { Request, Response } from "express";
import {
  checkIdExists,
  deleteOnePost,
  update,
} from "../services/postsServices";
import ctrlWrapper, { Controller } from "../decorators/ctrlWrapper";
import HttpError from "../helpers/HttpError";

const updatePost: Controller = async (req: Request, res: Response) => {
  const { id, published } = req.query;
  console.log("typeof id: ", typeof id);
  console.log("id: ", id);

  if (typeof id !== "string") {
    throw new HttpError(415, "Invalid or missing 'id' parameter");
    // res.status(400).json({ error: "Invalid or missing 'id' parameter" });
    // return;
  }
  const idNum = parseInt(id);
  console.log("typeof idNum: ", typeof idNum);
  console.log(idNum);
  const existedId = await checkIdExists(idNum);
  if (!existedId) {
    throw new HttpError(404, "Record to update not found");
    // res.status(404).json({ error: "Record to update not found" });
    // return;
  }
  const data =
    published === "true" ? { published: true } : { published: false };
  const result = await update(idNum, data);

  res.status(200).json(result);
};

const removePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("typeof id: ", typeof id);
  console.log("id: ", id);
  if (typeof id !== "string") {
    res.status(415).json({ error: "Invalid or missing 'id' parameter" });
    return;
  }

  const idNum = parseInt(id);
  console.log("idNum: ", idNum);
  console.log("typeof idNum: ", typeof idNum);

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
