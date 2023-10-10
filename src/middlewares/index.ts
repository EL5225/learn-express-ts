import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { TErrorResponse } from "@/utilities";
import { TZodErrorResponse } from "./types";

export const prismaErrorHandlrer = (
  err:
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError,
  req: Request,
  res: Response<TErrorResponse<string, string>>,
  next: NextFunction
) => {
  res.status(400).json({
    status: "error",
    message: "Bad Request",
    error: err.message,
  });
};

export const zodErrorHandler = (
  err: ZodError,
  req: Request,
  res: Response<TZodErrorResponse>,
  next: NextFunction
) => {
  res.status(400).json({
    status: "error",
    message: "Bad Request",
    error: {
      name: `Invalid input on property ${err.issues[0].path[0]}`,
      detail: err.errors[0].message,
    },
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response<TErrorResponse<string, null>>,
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
  res: Response<TErrorResponse<string, string>>,
  next: NextFunction
) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message,
  });
};
