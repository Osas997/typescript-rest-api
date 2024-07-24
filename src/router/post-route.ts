import express from "express";
import { PostController } from "../controller/post-controller";
import { upload } from "../middleware/upload-middleware";

export const postRoute = express.Router();

postRoute.get("/posts", PostController.indexByAuthor);
postRoute.post("/posts", upload.single("image"), PostController.store);
postRoute.put("/posts/:slug", upload.single("image"), PostController.update);
postRoute.delete("/posts/:slug", PostController.destroy);
