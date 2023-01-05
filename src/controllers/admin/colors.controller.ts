import { Request, Response } from "express";

import db from "../../models";
const Color = db.color;

const createColor = async (req: Request, res: Response): Promise<void> => {
  try {
    const newColor = new Color(req.body);
    await newColor.save();
    res.status(200).send(newColor);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllColors = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await Color.countDocuments();
    const colors = await Color.find();
    res.status(200).send({ total, colors });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateColor = async (req: Request, res: Response) => {
  try {
    const updated = await Color.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.json(500).send({ message: error });
  }
};

const deleteColor = async (req: Request, res: Response): Promise<void> => {
  try {
    await Color.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Color deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const colorsController = {
  createColor,
  getAllColors,
  updateColor,
  deleteColor,
};

export default colorsController;
