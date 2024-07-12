import express from "express";
import { CategoryController } from "../controller/category-controller";

export const categoryRoute = express.Router();

categoryRoute.post("/category", CategoryController.store);
categoryRoute.patch("/category/:slug", CategoryController.update);
categoryRoute.delete("/category/:slug", CategoryController.destroy);
