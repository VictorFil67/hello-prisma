import express from "express";
import postsControllers from "../controllers/postsControllers";

const postsRouter = express.Router();

const { updatePost, removePost } = postsControllers;

postsRouter.put("/", updatePost);
postsRouter.delete("/:id", removePost);

export default postsRouter;
