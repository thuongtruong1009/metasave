import mongoose from "mongoose";

const ColumnModel = mongoose.model(
  "Column",
  new mongoose.Schema({
    type: {
      type: String,
      default: "container",
    },
    icon: {
      type: String,
      default: "ProgressIcon",
    },
    name: {
      type: String,
      required: true,
    },
    props: {
      orientation: {
        type: String,
        default: "vertical",
      },
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  })
);

export default ColumnModel;
