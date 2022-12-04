import { Request, Response } from "express";
import db from "../../models";

const Project = db.project;
const Board = db.board;
const Card = db.card;

const createBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      res.status(404).send({ message: "Project not found" });
      return;
    }
    const newBoard = new Board(req.body);
    await newBoard.save();
    await Project.updateMany(
      { _id: req.body.projectId },
      {
        $push: { Boards: newBoard._id },
      }
    );

    const Boards = await Project.findById(
      req.body.projectId,
      "Boards"
    ).populate("Boards");

    res.status(200).send(Boards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  try {
    const Boards = await Project.findById(
      req.params.projectId,
      "Boards"
    ).populate("Boards");
    res.status(200).send(Boards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      res.status(404).send({ message: "Board not found" });
      return;
    }
    res.status(200).send(Board);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    // await Board.updateOne({ _id: req.params.id }, { $set: req.body });
    const updated = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.updateMany(
      { Boards: req.params.id },
      { $pull: { Boards: req.params.id } }
    );
    await Card.deleteMany({ BoardId: req.params.id });

    await Board.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Board has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const BoardController = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};

export default BoardController;
