import mongoose from "mongoose";

interface ITagModel extends mongoose.Document {
  name: string;
  color: mongoose.Schema.Types.ObjectId;
}

const tagSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
});

const TagModel = mongoose.model<ITagModel>("Tag", tagSchema);

export default TagModel;
