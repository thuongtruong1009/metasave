import crypto from "crypto";

const hashPassword = async (password: any) => {
  let salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
};

const comparePassword = async (password: any, hashed: any, salt: any) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === hashed;
};

export { hashPassword, comparePassword };
