import { Request } from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
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
