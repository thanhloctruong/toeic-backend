import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();



dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
    process.env.MONGODB_URL ||
      "mongodb+srv://acan:Acan2406%40@cluster0.iajd4.mongodb.net/toeic?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

app.get("/", (req, res) => {
  res.send("server is already");
});

const port = process.env.PORT || 8088;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});