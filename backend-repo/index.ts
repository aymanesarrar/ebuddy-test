import express from "express";
import { usersRouter } from "./routes/users.route";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", usersRouter);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
