import { Request, Response } from "express";

import db from "../../models";
const Tag = db.tag;
const User = db.user;
const Project = db.project;
const Board = db.board;
const Card = db.card;
const Color = db.color;
const Role = db.role;
const Category = db.category;

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
      case "board":
        const totalBoards = await Board.countDocuments();
        const groupBoards = await Board.aggregate([
          {
            $group: {
              _id: "$projectId",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalBoards, groups: groupBoards });
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
      case "tag":
        const totalColors = await Color.countDocuments();
        const groupColors = await Color.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res.status(200).send({ total: totalColors, groups: groupColors });
        break;
      case "category":
        const totalCategories = await Category.countDocuments();
        const groupCategories = await Category.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res
          .status(200)
          .send({ total: totalCategories, groups: groupCategories });
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
