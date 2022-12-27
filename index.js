import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routers/userRouter.js";
import exerciseRouter from "./src/routers/exerciseRouter.js";
import roomRouter from "./src/routers/roomRouter.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL ||
    "mongodb+srv://acan:Acan2406%40@cluster0.iajd4.mongodb.net/toeic?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/room", roomRouter);
app.get("/", (req, res) => {
  res.send("server is already");
});

const port = process.env.PORT || 8088;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
