import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const baseName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const extName = path.extname(file.originalname);
    cb(null, baseName + "-" + uniqueSuffix + extName);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."));
    }
  },
});
