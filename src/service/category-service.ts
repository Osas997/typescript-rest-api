import { prisma } from "../app/database";
import type { CategoryResponse } from "../model/category-model";

export class CategoryService {
  static async getCategory(): Promise<CategoryResponse[]> {
    const category = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
    });
    return category;
  }
}
