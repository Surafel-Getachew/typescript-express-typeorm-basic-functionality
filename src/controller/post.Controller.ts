import { Request, Response, NextFunction } from "express";
import * as PostService from "../services/post.service";

export const addPost = (req: Request, res: Response, next: NextFunction) => {
  PostService.addPost(req.body, req.user)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAll = (req: Request, res: Response, next: NextFunction) => {
  PostService.getAll(req.user)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  PostService.updatePost(req.user.id, req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await PostService.deletePost(req.params.id, req.user);
    return res.json(post);
  } catch (error) {
    next(error);
  }
};

export const tryRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await PostService.tryRoute(req.user);
    return res.json(check)
  } catch (error) {
    next(error);
  }
};
