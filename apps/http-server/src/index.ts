import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { ConnectDB } from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

const port: number = parseInt(process.env.PORT || "8080");

function serverStart() {
    ConnectDB()
    .then(() => {
        app.on("error", (err) => {
            throw err;
        });
        console.log("Connected to Database!")
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });

        app.get("/", (req, res) => {
            res.send("Yare Yare..! Yokoso watashino Servar des");
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
}

serverStart();
