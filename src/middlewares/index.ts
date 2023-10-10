import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorResponse } from "@/utilities";
import { TZodErrorResponse } from "./types";
import { Prisma } from "@prisma/client";

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
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      status: "error",
      message: "Bad Request",
      error: err?.meta?.cause as string,
    });
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(400).json({
      status: "error",
      message: "Bad Request",
      error: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      status: "error",
      message: "Bad Request",
      error: err?.message,
    });
  }

  return next(err);
};

export const zodErrorHandler = (
  err: ZodError,
  req: Request,
  res: Response<TZodErrorResponse>,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
      error: {
        name: `Invalid input on property ${err.issues[0].path[0]}`,
        detail: err.errors[0].message,
      },
    });
  }
  next(err);
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
  const errorMessage = err.message.split("\n");
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: errorMessage[errorMessage.length - 1],
  });

  next(err);
};
