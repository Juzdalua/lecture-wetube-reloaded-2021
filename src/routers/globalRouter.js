import express from "express";
import {join, login} from "../controllers/userController";
import {trending, search} from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

//각각의 js는 private. import 하기 위해서는 export해야함.
export default globalRouter;