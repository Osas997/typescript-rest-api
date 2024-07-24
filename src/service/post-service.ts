import slug from "slug";
import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";
import type { Post } from "@prisma/client";
import type { PostRequest, PostResponse } from "../model/post-model";
import { PostValidation } from "../validation/post-validation";

export class PostService {
  static async getAllPost(search?: string, category?: string): Promise<Post[]> {
    const whereQuery: any = {
      AND: [],
    };

    if (search) {
      whereQuery.AND.push({
        OR: [
          {
            body: {
              contains: search,
            },
          },
          {
            title: {
              contains: search,
            },
          },
        ],
      });
    }

    if (category) {
      whereQuery.AND.push({
        categories: {
          some: {
            slug: category,
          },
        },
      });
    }

    const posts = await prisma.post.findMany({
      where: whereQuery,
      include: {
        categories: true,
        author: {
          select: {
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return posts;
  }
  static async getPostsByAuthor(userID: number): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        author_id: userID,
      },
      include: {
        categories: true,
        author: {
          select: {
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return posts;
  }

  static async createPost(
    userID: number,
    req: PostRequest
  ): Promise<PostResponse> {
    const postData = validate(PostValidation.CREATE, req);

    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: postData.category,
        },
      },
      select: {
        id: true,
      },
    });

    if (categories.length !== postData.category.length) {
      throw new ResponseError("ID Category not found", 404);
    }

    const SLUG = await this.generateSlug(postData.title);

    const post = await prisma.post.create({
      data: {
        title: postData.title,
        slug: SLUG,
        body: postData.body,
        image: req.image,
        author_id: userID,
        categories: {
          connect: categories,
        },
      },
      include: {
        categories: true,
        author: {
          select: {
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return post;
  }

  static async updatePost(
    userID: number,
    slugParam: string,
    req: PostRequest
  ): Promise<PostResponse> {
    const post = await this.getPostBySlug(slugParam);

    // authorization check
    if (post.author_id !== userID) {
      throw new ResponseError("Unauthorized", 401);
    }

    const postData = validate(PostValidation.UPDATE, req);

    if (postData.title && postData.title !== post.title) {
      postData.slug = await this.generateSlug(postData.title);
    }

    if (req.category) {
      const categories = await prisma.category.findMany({
        where: {
          id: {
            in: req.category,
          },
        },
        select: {
          id: true,
        },
      });

      if (categories.length !== req.category.length) {
        throw new ResponseError("ID Category not found", 404);
      }

      postData.categories = {
        set: [],
        connect: categories,
      };
    }

    if (!req.image) {
      postData.image = post.image;
    }

    const updatedPost = await prisma.post.update({
      where: {
        slug: slugParam,
      },
      data: postData,
      include: {
        categories: true,
        author: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    return updatedPost;
  }

  static async deletePost(slugParam: string, userID: number): Promise<void> {
    const post = await this.getPostBySlug(slugParam);

    // authorization check

    if (post.author_id !== userID) {
      throw new ResponseError("Unauthorized", 401);
    }

    await prisma.post.delete({
      where: {
        slug: slugParam,
      },
    });

    return;
  }

  static async getPostBySlug(slugParam: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: {
        slug: slugParam,
      },
    });
    if (!post) {
      throw new ResponseError("Post not found", 404);
    }
    return post;
  }

  static async generateSlug(title: string): Promise<string> {
    let newSlug = slug(title);

    const slugFilter = { slug: newSlug };

    let sameSlug = await prisma.post.findFirst({
      where: slugFilter,
    });

    while (sameSlug) {
      newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
      sameSlug = await prisma.post.findFirst({
        where: { slug: newSlug },
      });
    }

    return newSlug;
  }
}
