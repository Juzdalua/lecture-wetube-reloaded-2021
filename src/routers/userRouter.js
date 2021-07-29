import express from "express";
import { logout, edit, remove, see,
     startGithubLogin, finishGithubLogin 
    } from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.get("/logout", logout);
usersRouter.get("/edit", edit);
usersRouter.get("/remove", remove);
usersRouter.get("/github/start", startGithubLogin);
usersRouter.get("/github/finish", finishGithubLogin);
usersRouter.get(":id(\\d+)", see);
// :xx -> url 내부에 변수 지정


export default usersRouter;