import express from "express";
import authControllers from "../controllers/authControllers";
import authenticate from "../middlewares/authenticate";

const authRouter = express.Router();

const { signup, signin } = authControllers;

authRouter.post("/", signup);
authRouter.post("/signin", signin);

export default authRouter;
