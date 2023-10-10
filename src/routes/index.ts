import { NextFunction, Request, Response, Router } from "express";
import users from "./users";
import account from "./acconts";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World from API!");
});

router.use("/users", users);
router.use("/accounts", account);

export default router;
