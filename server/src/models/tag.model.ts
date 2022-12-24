import mongoose from "mongoose";

const TagModel = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: {
      type: String,
      unique: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  })
);

export default TagModel;
