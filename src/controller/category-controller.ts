import type { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";

export class CategoryController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategory();

      if (categories.length === 0) {
        return res.status(404).send({ error: "Category not found" });
      }

      res.status(200).send({ data: categories });
    } catch (error) {
      next(error);
    }
  }
}
