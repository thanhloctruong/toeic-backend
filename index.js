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
