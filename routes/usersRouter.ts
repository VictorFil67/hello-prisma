import express from "express";
import usersControllers from "../controllers/usersControllers";
import authenticate from "../middlewares/authenticate";

const usersRouter = express.Router();

const { usersList, createUser, deleteUser } = usersControllers;

usersRouter.get("/", usersList);
usersRouter.post("/", createUser);
usersRouter.delete("/", authenticate, deleteUser);

export default usersRouter;
