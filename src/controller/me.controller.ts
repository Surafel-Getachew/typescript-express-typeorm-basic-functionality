import { Request, Response, NextFunction } from "express";
import * as MeSvc from "../services/me.service";

export function signUp(req: Request, res: Response, next: NextFunction) {
  MeSvc.signUp(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export function login(req: Request, res: Response, next: NextFunction) {
  MeSvc.login(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
  // res.status(200).send({msg:"This is from me controller"})
}

export function signIn(req: Request, res: Response, next: NextFunction) {}

export function update(req: Request, res: Response, next: NextFunction) {
  res.status(200).send({ msg: "This is from me controller" });
}
export function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).send({ msg: "This is from me controller" });
}
export function setPassword(req: Request, res: Response, next: NextFunction) {
  res.status(200).send({ msg: "This is from me controller" });
}
export function verifyUser(req: Request, res: Response, next: NextFunction) {
  res.status(200).send({ msg: "This is from me controller" });
}
