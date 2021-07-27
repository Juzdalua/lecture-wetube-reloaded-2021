import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import usersRouter from "./routers/userRouter";
import {localsMiddleware} from "./middlewares";

//create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); 
app.use(logger);
app.use(express.urlencoded({extended:true}));

// session. 사이트로 들어오는 모두를 기억. router 전에 작성!
app.use(session({
    secret: "hi",
    resave: true,
    saveUninitialized: true
}));

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", usersRouter);

export default app;