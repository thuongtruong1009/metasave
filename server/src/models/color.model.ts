import mongoose from "mongoose";

const ColorModel = mongoose.model(
  "Color",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

export default ColorModel;
