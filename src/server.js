import express from "express";

//create server
const PORT = 4000
const app = express();
const handleListening = () => console.log(`Server listening on port https://localhost:${PORT}`)
app.listen(PORT, handleListening);

