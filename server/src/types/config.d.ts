export type IEnv = {
  port: string | number;
  mongoURL: string;
  env: string;
  secret: string;
};

export type ICorsOptions = {
  origin: string;
  credentials: boolean;
};
