import express from "express";
import morgan from "morgan";

//create server
const PORT = 4000;
const app = express();
const logger = morgan("dev");

//application setting

app.use(logger);
app.get("/", (req, res) => res.end());

//express code 
const handleListening = () => 
    console.log(`Server listening on port https://localhost:${PORT}`)
app.listen(PORT, handleListening);

