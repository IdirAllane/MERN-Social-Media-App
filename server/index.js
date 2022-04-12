import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
// ynzgb0h2gwUz1ECP;

const CONNETION_URL =
    "mongodb+srv://idirAllaneSocialNetwork:ynzgb0h2gwUz1ECP@idirallane.sav8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNETION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on ${PORT}`))
    )
    .catch((e) => console.log("error", e.message));
