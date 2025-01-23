import { NextFunction, Request, Response } from "express";
import { adminApp } from "../config/firebase";
import { CreateUserRequest } from "../types/user.entity";
const verifyToken = async (
  req: CreateUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const user = await adminApp.auth().verifyIdToken(token as string);

    if (user) {
      req.uid = user.uid;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
    // req.user = user;
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { verifyToken };
