import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import usersRouter from "./routers/userRouter";

//create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); 
app.use(logger);
app.use(express.urlencoded({extended:true}));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", usersRouter);

export default app;