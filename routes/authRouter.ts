import express from "express";
import authControllers from "../controllers/authControllers";
import authenticate from "../middlewares/authenticate";
import validateBody from "../decorators/validateBody";
import { signinSchema, signupSchema } from "../Schemas/usersSchemas";

const authRouter = express.Router();

const { signup, signin, getCurrent, logout, getRefreshCurrent } =
  authControllers;

authRouter.post("/signup", validateBody(signupSchema), signup);
authRouter.post("/signin", validateBody(signinSchema), signin);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/refreshCurrent", authenticate, getRefreshCurrent);

export default authRouter;
