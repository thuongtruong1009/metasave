import mongoose from "mongoose";

const CardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    type: {
      type: String,
      default: "card",
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
