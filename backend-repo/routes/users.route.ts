import express from "express";
import { fetchUserData, updateUserData } from "../controller/users.controller";
import { verifyToken } from "../middleware/auth.middleware";

const usersRouter = express.Router();

usersRouter.get("/fetch-user-data", verifyToken, fetchUserData);
usersRouter.put("/update-user-data", verifyToken, updateUserData);

export { usersRouter };
