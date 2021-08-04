import express from "express";
import { logout, getEdit, postEdit, see,
     startGithubLogin, finishGithubLogin 
    } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const usersRouter = express.Router();

usersRouter.get("/logout", protectorMiddleware, logout);
usersRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
usersRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
usersRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
usersRouter.get(":id(\\d+)", see);
// :xx -> url 내부에 변수 지정


export default usersRouter;