import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  testDes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exercise",
    required: true,
  },
  listUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
});
const room = mongoose.model("Room", roomSchema);
export default room;
