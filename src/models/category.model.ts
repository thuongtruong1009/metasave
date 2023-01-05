import mongoose from "mongoose";

interface IColorModel extends mongoose.Document {
  name: string;
}

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 10,
  },
});

const CategoryModel = mongoose.model<IColorModel>("Category", CategorySchema);

export default CategoryModel;
