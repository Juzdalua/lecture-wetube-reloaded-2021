import express from "express";

//create server
const PORT = 4000;
const app = express();

//application setting
const handleHome = (req, res) => {
    return res.end(); //reqeust 종료 1
}
const handleLogin = (req, res) => {
    return res.send("Login here.") //reqeust 종료 2
}
app.get("/", handleHome);
app.get("/login", handleLogin);

//express code 
const handleListening = () => 
    console.log(`Server listening on port https://localhost:${PORT}`)
app.listen(PORT, handleListening);

