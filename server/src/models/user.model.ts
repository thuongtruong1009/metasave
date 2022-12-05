import mongoose from "mongoose";

// interface IUser {
//   username: string;
//   email: string;
//   password: string;
//   isVerify: boolean;
//   avatar: string;
//   salt: string;
//   roles: string[];
//   projects: string[];
// }

interface IUserModel extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  isVerify: boolean;
  avatar: string;
  salt: string;
  roles: string[];
  projects: string[];
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      max: 21,
      min: 8,
    },
    avatar: String,
    salt: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  }
  // { timestamps: true }
).set("timestamps", true);

const UserModel = mongoose.model<IUserModel>("User", UserSchema);

export default UserModel;
