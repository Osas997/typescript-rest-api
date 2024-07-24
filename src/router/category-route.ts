import express from "express";
import { CategoryController } from "../controller/category-controller";
import { isAdmin } from "../middleware/isadmin-middleware";

export const categoryRoute = express.Router();

categoryRoute.use(isAdmin);

categoryRoute.post("/category", CategoryController.store);
categoryRoute.patch("/category/:slug", CategoryController.update);
categoryRoute.delete("/category/:slug", CategoryController.destroy);
