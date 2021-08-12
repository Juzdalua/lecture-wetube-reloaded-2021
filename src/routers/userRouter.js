import express from "express";
import { logout, getEdit, postEdit, see,
     startGithubLogin, finishGithubLogin, 
     getChangePassword, postChangePassword
    } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";


const usersRouter = express.Router();

usersRouter.get("/logout", protectorMiddleware, logout);
usersRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
usersRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
usersRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
usersRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
usersRouter.get("/:id", see); // :xx -> url 내부에 변수 지정



export default usersRouter;