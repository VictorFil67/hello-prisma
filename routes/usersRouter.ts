import express from "express";
import usersControllers from "../controllers/usersControllers";

const usersRouter = express.Router();

const { usersList } = usersControllers;

usersRouter.get("/", usersList);

export default usersRouter;
