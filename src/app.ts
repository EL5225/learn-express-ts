import express, { Express } from "express";
import "dotenv/config";
import router from "@/routes";
import {
  zodErrorHandler,
  notFoundHandler,
  prismaErrorHandlrer,
  serverErrorHandler,
} from "@/middlewares";

const app: Express = express();
const { PORT } = process.env;
app.use(express.json());

app.use("/api", router);
app.use(zodErrorHandler);
app.use(prismaErrorHandlrer);
app.use(notFoundHandler);
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
