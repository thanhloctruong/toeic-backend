import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  des: [
    {
      url: { type: String, required: true },
      question: { type: String, unique: true },
      amountAnswer: { type: Number, required: true },
      answerCorrect: { type: String, unique: true, required: true },
    },
  ],
});
const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
