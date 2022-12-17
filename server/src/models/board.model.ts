import mongoose from "mongoose";

const BoardModel = mongoose.model(
  "Board",
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
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    background: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    customBackground: {
      type: String,
      default: "",
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

export default BoardModel;
