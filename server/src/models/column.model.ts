import mongoose from "mongoose";

const ColumnModel = mongoose.model(
  "Column",
  new mongoose.Schema({
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
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
  }).set("timestamps", true)
);

export default ColumnModel;
