import express from "express";
import { UserController } from "../controller/user-controller";
import { CategoryController } from "../controller/category-controller";
import { PostController } from "../controller/post-controller";

export const publicRoute = express.Router();

publicRoute.post("/register", UserController.register);
publicRoute.post("/login", UserController.login);
publicRoute.post("/refresh", UserController.refresh);
publicRoute.get("/category", CategoryController.index);
publicRoute.get("/all-posts", PostController.index);
publicRoute.get("/posts/:slug", PostController.show);
