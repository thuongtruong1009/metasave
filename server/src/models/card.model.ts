import mongoose from "mongoose";

const CardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    type: {
      type: String,
      default: "card",
    },
    loading: Boolean,
    icon: {
      type: String,
      default: "fas fa-clipboard-list",
    },
    data: {
      type: String,
      required: true,
    },
  })
);

export default CardModel;
