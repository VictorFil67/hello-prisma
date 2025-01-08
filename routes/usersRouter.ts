import express from "express";
import usersControllers from "../controllers/usersControllers";

const usersRouter = express.Router();

const { usersList, createUser } = usersControllers;

usersRouter.get("/", usersList);
usersRouter.post("/", createUser);

export default usersRouter;
