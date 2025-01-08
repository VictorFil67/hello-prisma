import express from "express";
import postsControllers from "../controllers/postsControllers";

const postsRouter = express.Router();

const { updatePost } = postsControllers;

postsRouter.put("/", updatePost);

export default postsRouter;
