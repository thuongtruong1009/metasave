// import { Request, Response } from "express";
// import { Error } from "mongoose";

// import db from "../models";
// const User = db.user;
// const Project = db.project;

// const createProject = (req: Request, res: Response) => {
//   if (!req.body.name) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   const project = new Project({
//     name: req.body.name,
//     description: req.body.description,
//     category: req.body.category,
//     customBackground: req.body.customBackground,
//   });

//   project
//     .save(project)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Project.",
//       });
//     });
// };

// const projectController = {
//   createProject,
// };

// export default projectController;
