import slug from "slug";
import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";
import type {
  CategoryRequest,
  CategoryResponse,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { validate } from "../validation/validation";

export class CategoryService {
  static async getCategory(): Promise<CategoryResponse[]> {
    const category = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
    });
    return category;
  }

  static async createCategory(req: CategoryRequest): Promise<CategoryResponse> {
    const categoryRequest = validate(CategoryValidation.CREATE, req);

    let SLUG = await this.generateSlug(categoryRequest.name);

    const category = await prisma.category.create({
      data: {
        name: categoryRequest.name,
        slug: SLUG,
      },
    });

    return category;
  }
  static async updateCategory(
    slugParam: string,
    req: CategoryRequest
  ): Promise<any> {
    let category = await this.getCategoryBySlug(slugParam);

    const categoryRequest = validate(CategoryValidation.CREATE, req);

    let SLUG = category.slug;
    if (categoryRequest.name !== category.name) {
      SLUG = await this.generateSlug(categoryRequest.name);
    }

    categoryRequest.slug = SLUG;

    category = await prisma.category.update({
      where: {
        slug: slugParam,
      },
      data: categoryRequest,
    });

    return category;
  }

  static async deleteCategory(slugParam: string): Promise<void> {
    await this.getCategoryBySlug(slugParam);

    await prisma.category.delete({
      where: {
        slug: slugParam,
      },
    });

    return;
  }

  static async getCategoryBySlug(slugParam: string): Promise<CategoryResponse> {
    const category = await prisma.category.findUnique({
      where: {
        slug: slugParam,
      },
    });
    if (!category) {
      throw new ResponseError("Category not found", 404);
    }
    return category;
  }

  static async generateSlug(name: string): Promise<string> {
    let newSlug = slug(name);

    const slugFilter = { slug: newSlug };

    let sameSlug = await prisma.category.findFirst({
      where: slugFilter,
    });

    while (sameSlug) {
      newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
      sameSlug = await prisma.category.findFirst({
        where: { slug: newSlug },
      });
    }

    return newSlug;
  }
}
