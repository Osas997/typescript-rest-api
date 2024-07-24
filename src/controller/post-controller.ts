import type { NextFunction, Request, Response } from "express";
import { PostService } from "../service/post-service";
import type { PostRequest } from "../model/post-model";
import type { Request as JWTRequest } from "express-jwt";

export class PostController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string;

      const search = req.query.search as string;

      const posts = await PostService.getAllPost(search, category);

      if (posts.length === 0) {
        return res.status(404).send({ error: "Post not found" });
      }

      res.status(200).send({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;

      const post = await PostService.getPostBySlug(slug);

      res.status(200).send({ data: post });
    } catch (error) {
      next(error);
    }
  }

  static async indexByAuthor(
    req: JWTRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userID = req.auth!.id;

      const posts = await PostService.getPostsByAuthor(userID);

      if (posts.length === 0) {
        return res.status(404).send({ error: "Post not found" });
      }

      res.status(200).send({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      // if (!req.file) {
      //   throw new ResponseError("Image is required", 422);
      // }

      const userID = req.auth!.id;

      req.body.image = "test";

      const request: PostRequest = req.body;

      const post = await PostService.createPost(userID, request);

      res.status(201).send({ data: post });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      // if (req.file) {
      //   req.body.image = req.file.path;
      // }

      const userID = req.auth!.id;

      const slug = req.params.slug;

      const request = req.body;

      const post = await PostService.updatePost(userID, slug, request);

      res.status(201).send({ data: post });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;

      const userID = req.auth!.id;

      await PostService.deletePost(slug, userID);

      res.status(200).send({ message: "Post deleted" });
    } catch (error) {
      next(error);
    }
  }
}
