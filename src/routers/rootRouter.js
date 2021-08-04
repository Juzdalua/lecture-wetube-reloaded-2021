import express from "express";
import {getJoin, postJoin, getLogin, postLogin} from "../controllers/userController";
import {home, search} from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search",search);


//각각의 js는 private. import 하기 위해서는 export해야함.
export default rootRouter;