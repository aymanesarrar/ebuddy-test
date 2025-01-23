import { Request, Response } from "express";
import { adminApp } from "../config/firebase";
import { IUser } from "shared";
const fetchUserData = async (request: Request, res: Response) => {
  try {
    const user = await adminApp.auth().getUser(request.uid);

    res.json({ user });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserData = async (request: Request, res: Response) => {
  try {
    const userRecord = await adminApp
      .auth()
      .updateUser(request.uid, request.body);
    res.json({ userRecord });
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ error: "Bad Request" });
  }
};

export { updateUserData, fetchUserData };
