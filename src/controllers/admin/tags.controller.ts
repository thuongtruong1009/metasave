import { Request, Response } from "express";

import db from "../../models";
const Board = db.board;
const Tag = db.tag;

const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(200).send(newTag);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.find();
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const updated = await Tag.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.json(500).send({ message: error });
  }
};

const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    await Board.updateMany(
      { cards: { tags: req.params.id } },
      { $set: { cards: { tags: null } } }
    );
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const tagsController = {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
};

export default tagsController;
