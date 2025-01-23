import { Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      uid: string;
    }
  }
}

interface User {
  username: string;
  password: string;
}

export interface CreateUserRequest extends Request {
  body: User;
  uid: string;
}
