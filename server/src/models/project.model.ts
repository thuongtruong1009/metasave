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

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
