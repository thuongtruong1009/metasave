import mongoose from "mongoose";

interface IProjectModel extends mongoose.Document {
  owner: mongoose.Schema.Types.ObjectId;
  type: string;
  name: string;
  access: string;
  description: string;
  categoryId: string;
  members: mongoose.Schema.Types.ObjectId[];
  isFavorite: boolean;
  background: string;
  customBackground: string;
  props: {
    orientation: string;
  };
  boards: mongoose.Schema.Types.ObjectId[];
  startDate: Date;
  endDate: Date;
}

const ProjectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  access: {
    type: String,
    default: "public",
  },
  description: {
    type: String,
    default: "",
  },
  categoryId: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  isFavorite: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: "#ffffff",
  },
  customBackground: {
    type: String,
    default: "",
  },
  props: {
    orientation: {
      type: String,
      default: "horizontal",
    },
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
}).set("timestamps", true);

const ProjectModel = mongoose.model<IProjectModel>("Project", ProjectSchema);

export default ProjectModel;
