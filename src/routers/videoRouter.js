import express from "express";
import {
     watch, getEdit, postEdit,
     getUpload, postUpload, deleteVideo
} from "../controllers/videoController";
import {protectorMiddleware} from"../middlewares";

const videoRouter = express.Router();

// /upload를 /:id 아래 두면  express가 upload를 변수로 인식
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch); //hexadecimal 정규식
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);

export default videoRouter;