import express from "express";
import {
     watch, getEdit, postEdit,
     getUpload, postUpload
} from "../controllers/videoController";

const videoRouter = express.Router();

// /upload를 /:id 아래 두면  express가 upload를 변수로 인식

videoRouter.get("/:id(\\d+)", watch); //숫자만 받는 정규식
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);

videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;