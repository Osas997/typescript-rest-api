import express from "express";
import { UserController } from "../controller/user-controller";
import { CategoryController } from "../controller/category-controller";

export const publicRoute = express.Router();

publicRoute.post("/register", UserController.register);
publicRoute.post("/login", UserController.login);
publicRoute.post("/refresh", UserController.refresh);
publicRoute.get("/category", CategoryController.index);
