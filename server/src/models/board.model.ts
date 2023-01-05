import mongoose from "mongoose";

interface IBoardModel extends mongoose.Document {
  projectId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  isFavorite: boolean;
  background: mongoose.Schema.Types.ObjectId;
  customBackground: string;
  cards: mongoose.Schema.Types.ObjectId[];
}

const boardSchema: mongoose.Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
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
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
}).set("timestamps", true);

const BoardModel = mongoose.model<IBoardModel>("Board", boardSchema);

export default BoardModel;
