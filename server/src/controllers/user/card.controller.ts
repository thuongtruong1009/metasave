import { Request, Response } from "express";

import db from "../../models";
const Column = db.column;
const Card = db.card;

const getAllCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await Column.findById(req.params.columnId, "cards").populate(
      "cards"
    );
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getCardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).send(card);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const existed = await Column.findById(req.body.columnId);
    if (!existed) {
      res.status(404).send({ message: "Column not found" });
    }
    const card = new Card(req.body);
    const savedCard = await card.save();

    await Column.updateOne({ $push: { cards: savedCard._id } });

    const updated = await Column.findById(savedCard.columnId, "cards").populate(
      "cards"
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const existed = await Card.findById(req.body.id);
    if (!existed) {
      res.status(404).send({ message: "Card not found" });
    }
    const updated = await Card.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteCard = (req: Request, res: Response): void => {
  try {
    res.status(200).send({ message: "delete card" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const cardController = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};

export default cardController;
