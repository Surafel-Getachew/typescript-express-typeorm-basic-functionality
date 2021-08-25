import jwt from "jsonwebtoken";
import config from "../config/index";
import { User } from "../models/entity/User";
import { NextFunction, Request, Response } from "express";

export const generateAuthToken = (user: User) => {
  const token = jwt.sign(user.id as string, config.JWT_SECRET);
  return token;
};

export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user;
  const decoded = await verifyToken(req);
  if (decoded) {
    user = await getUser(decoded);
  }

  req.user = user;
  next();
};

export const verifyToken = async (req: Request) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    // return res.sendStatus(401);
    throw new Error("Invalid token");
  }

  let decoded;
  jwt.verify(token, config.JWT_SECRET, (err, userId) => {
    // if (err) return res.sendStatus(403);
    if (err) throw new Error("Invalid token");
    decoded = userId;
  });

  return decoded;
};

const getUser = async (userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};
