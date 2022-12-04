import mongoose from "mongoose";

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
  description: String,
  category: String,
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
  customBackground: String,
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
  },
  endDate: {
    type: Date,
  },
}).set("timestamps", true);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
