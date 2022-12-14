import { Request, Response } from "express";

import db from "../../models";
const User = db.user;
const Event = db.event;
import { queryDateTimePeriod } from "../../utils/time";

const createEvent = async (req: any, res: Response) => {
  try {
    const event = await Event.create({ organizer: req.user.id, ...req.body });
    await User.updateOne(
      { _id: req.user.id },
      { $push: { events: event._id } }
    );

    res.status(201).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllEvents = async (req: any, res: Response) => {
  try {
    if (req.query.present === "organizer") {
      const total = await Event.countDocuments(
        { organizer: req.user.id },
        { "time.date": queryDateTimePeriod(req.query.start, req.query.end) }
      );
      const events = await Event.find(
        {
          "time.date": queryDateTimePeriod(req.query.start, req.query.end),
        },
        "title time updatedAt"
      ).populate("colorId", "name");
      res.status(200).send({ total, events });
    }
    if (req.query.present === "participant") {
      const total = await Event.countDocuments(
        { attendees: { $in: req.user.id } },
        { "time.date": queryDateTimePeriod(req.query.start, req.query.end) }
      );
      const events = await Event.find(
        { attendees: { $in: req.user.id } },
        { "time.date": queryDateTimePeriod(req.query.start, req.query.end) },
        "title time updatedAt"
      ).populate("colorId", "name");
      res.status(200).send({ total, events });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEventById = async (req: any, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("colorId", "name")
      .populate("organizer", "username avatar")
      .populate("attendees", "username avatar");
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEvent = async (req: any, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { events: req.params.id } }
    );
    res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const eventController = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
export default eventController;
