import { IRole } from "..";

export type IUser = {
  _id: string;
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  roles: IRole[];
  projects: string[];
};
