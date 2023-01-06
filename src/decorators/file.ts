import { Request } from "express";
import multer from "multer";

const preDest = "resources";

const upload = (dest: string) => {
  const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, `${preDest}/${dest}`);
    },
    filename(req: any, file: Express.Multer.File, cb: Function) {
      let fileName = `${req.user.id}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  return multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    },
  });
};

export const uploadAvatar = upload("avatars").single("file");
export const uploadEventImg = upload("events").single("file");
