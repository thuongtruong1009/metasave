import mongoose from "mongoose";

const CardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    type: {
      type: String,
      default: "card",
    },
    status: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      default: "fas fa-clipboard-list",
    },
    text: {
      type: String,
      required: true,
    },
    tagId: {
      type: String,
    },
  }).set("timestamps", true)
);

export default CardModel;
