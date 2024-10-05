import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Question Service is running!");
});

export default app;
