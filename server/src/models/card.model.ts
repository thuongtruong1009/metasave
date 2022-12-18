import mongoose from "mongoose";

const CardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    type: {
      type: String,
      default: "draggable",
    },
    status: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
    },
    tagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: false,
      default: "639ee0c235daa8e2541b1cf8",
    },
  }).set("timestamps", true)
);

export default CardModel;
