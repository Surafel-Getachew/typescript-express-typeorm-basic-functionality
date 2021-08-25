import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/entity/User";

export const checkRole = (roles: Array<String>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const userRepository = getRepository(User);

    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(401).send(error);
    }

    if (roles.indexOf(user!.role!) > -1) next();
    else res.status(401).send();
  };
};
