import mongoose from "mongoose";

interface ICardModel extends mongoose.Document {
  boardId: string;
  type: string;
  status: number;
  loading: boolean;
  icon: string;
  text: string;
  tagId: string;
}

const cardSchema: mongoose.Schema = new mongoose.Schema({
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
}).set("timestamps", true);

const CardModel = mongoose.model<ICardModel>("Card", cardSchema);

export default CardModel;
