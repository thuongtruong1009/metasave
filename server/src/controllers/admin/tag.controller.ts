import { Request, Response } from "express";

import db from "../../models";
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

const TagController = {
  createTag,
  getAllTags,
};

export default TagController;
