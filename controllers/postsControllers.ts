import { Request, Response } from "express";
import { update } from "../services/postsServices";

const updatePost = async (req: Request, res: Response) => {
  const { id, published } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'id' parameter" });
  }
  const idNum = parseInt(id);
  const result = await update(idNum, published);

  res.status(200).json(result);
};
