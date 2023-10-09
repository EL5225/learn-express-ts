import { NextFunction, Request, Response } from "express";
import { TUsersRequest, TUsersResponse } from "./types";
import { prisma, VSCreateUsers } from "@/libs";

export const createUsers = async (
  req: Request,
  res: Response<TUsersResponse>,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone_number }: TUsersRequest = req.body;

    VSCreateUsers.parse(req.body);

    const users = await prisma.users.create({
      data: {
        name,
        email,
        password,
        Accounts: {
          create: {
            phone_number,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response<TUsersResponse>,
  next: NextFunction
) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
