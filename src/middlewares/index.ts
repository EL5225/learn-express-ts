import { Handler, NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const prismaErrorHandlrer = (
  err:
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    status: "error",
    message: "Bad Request",
    error: err.message,
  });
};

export const zodErrorHandler = (
  err: z.ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    status: "error",
    message: "Bad Request",
    error: {
      name: `Invalid input on property ${err.issues[0].path[0]}`,
      message: err.errors[0].message,
    },
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: "error",
    message: "Not Found",
  });
};

export const serverErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message,
  });
};
