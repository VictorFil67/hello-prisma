import express from "express";
import authControllers from "../controllers/authControllers";
import authenticate from "../middlewares/authenticate";
import validateBody from "../decorators/validateBody";
import { signupSchema } from "../Schemas/usersSchemas";

const authRouter = express.Router();

const { signup, signin } = authControllers;

authRouter.post("/", validateBody(signupSchema), signup);
authRouter.post("/signin", signin);

export default authRouter;
