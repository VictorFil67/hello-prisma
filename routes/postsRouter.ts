import express from "express";
import postsControllers from "../controllers/postsControllers";
import authenticate from "../middlewares/authenticate";

const postsRouter = express.Router();

const { updatePost, removePost } = postsControllers;

postsRouter.put("/", authenticate, updatePost);
postsRouter.delete("/:id", removePost);

export default postsRouter;
