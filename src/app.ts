import express, { Express, NextFunction, Request, Response } from "express";
import "dotenv/config";
import router from "@/routes";
import {
  zodErrorHandler,
  notFoundHandler,
  serverErrorHandler,
  prismaErrorHandlrer,
} from "@/middlewares";
import { TPublicResponses } from "@/utilities";

const app: Express = express();
const { PORT } = process.env;
app.use(express.json());

app.get(
  "/",
  (req: Request, res: Response<TPublicResponses>, next: NextFunction) => {
    res.json({
      status: true,
      message: "Welcome to API!",
    });
  }
);

app.use("/api", router);
app.use(prismaErrorHandlrer);
app.use(zodErrorHandler);
app.use(notFoundHandler);
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
