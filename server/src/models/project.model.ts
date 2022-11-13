import mongoose from "mongoose";

const ProjectModel = mongoose.model(
  "Project",
  new mongoose.Schema({
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
    description: String,
    category: String,
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
  })
);

export default ProjectModel;
