const allAccess = (req: any, res: any) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req: any, res: any) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req: any, res: any) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req: any, res: any) => {
  res.status(200).send("Moderator Content.");
};

const userController = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
};

export default userController;
