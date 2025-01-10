import express from "express";
import authControllers from "../controllers/authControllers";

const authRouter = express.Router();

const { signup } = authControllers;

authRouter.post("/", signup);

export default authRouter;
