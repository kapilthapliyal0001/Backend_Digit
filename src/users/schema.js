import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema(
  {
    visitor: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // will add the time stamp !
  }
);

export default model("files", userSchema);
