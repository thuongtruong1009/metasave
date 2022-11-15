import mongoose from "mongoose";

const TagModel = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

export default TagModel;
