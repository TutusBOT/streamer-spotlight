import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${process.env.PORT || 3000}`);
});

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", (error) => console.log(error));

app.use("/", router());
