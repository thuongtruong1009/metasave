import mongoose from "mongoose";

interface IEventModel extends mongoose.Document {
  organizer: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  time: {
    start: string;
    end: string;
    date: string;
  };
  start: string;
  end: string;
  location: string;
  attendees: string[];
  isFavorite: boolean;
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
      type: String,
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
