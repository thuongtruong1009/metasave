import crypto from "crypto";

const hashPassword = async (password: string) => {
  let salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
};

const comparePassword = async (
  password: string,
  hashed: string,
  salt: string
) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === hashed;
};

export { hashPassword, comparePassword };
