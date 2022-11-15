import { Request, Response } from "express";
import { Error } from "mongoose";

import db from "../../models";
const Tag = db.tag;
const User = db.user;
const Project = db.project;
const Column = db.column;
const Card = db.card;

const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    switch (req.query.scope) {
      case "card":
        const totalCards = await Card.countDocuments();
        const groupCards = await Card.aggregate([
          {
            $group: {
              _id: "$id",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalCards, groups: groupCards });
        break;
      case "column":
        const totalColumns = await Column.countDocuments();
        const groupColumns = await Column.aggregate([
          {
            $group: {
              _id: "$projectId",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalColumns, groups: groupColumns });
        break;
      case "project":
        const totalProject = await Project.countDocuments();
        const projects = await Project.aggregate([
          {
            $group: {
              _id: "$owner",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalProject, groups: projects });
        break;
      case "tag":
        const totalTags = await Tag.countDocuments();
        const groupTags = await Tag.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res.status(200).send({ total: totalTags, groups: groupTags });
        break;
      default:
        const totalUsers = await User.countDocuments();
        const groupUsers = await User.aggregate([
          {
            $group: {
              _id: "$roles",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalUsers, groups: groupUsers });
        break;
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const statisticalController = {
  getOverview,
};

export default statisticalController;
