import type { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";
import type { CategoryRequest } from "../model/category-model";

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

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as CategoryRequest;

      const category = await CategoryService.createCategory(request);

      res.status(201).send({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as CategoryRequest;

      const slug = req.params.slug;

      const category = await CategoryService.updateCategory(slug, request);

      res.status(200).send({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;

      await CategoryService.deleteCategory(slug);

      res.status(200).send({ message: "Category deleted" });
    } catch (error) {
      next(error);
    }
  }
}
