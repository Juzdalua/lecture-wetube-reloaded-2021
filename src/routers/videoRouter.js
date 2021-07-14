import express from "express";
import { trending, see, edit, deleteVideo, upload } from "../controllers/videoController";

const videoRouter = express.Router();

// /upload를 /:id 아래 두면  express가 upload를 변수로 인식
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see); //숫자만 받는 정규식
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;