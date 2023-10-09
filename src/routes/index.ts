import { NextFunction, Request, Response, Router } from "express";
import users from "./users";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World from API!");
});

router.use("/users", users);

export default router;
