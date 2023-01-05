import mongoose from "mongoose";

interface IEventModel extends mongoose.Document {
  organizer: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  time: {
    start: string;
    end: string;
    date: Date;
  };
  location: string;
  attendees: string[];
  colorId: mongoose.Schema.Types.ObjectId;
}

const eventSchema: mongoose.Schema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  time: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  location: {
    type: String,
    default: "",
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
}).set("timestamps", true);

const EventModel = mongoose.model<IEventModel>("Event", eventSchema);

export default EventModel;
