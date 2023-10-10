import { NextFunction, Request, Response } from "express";
import { TUsersRequest, TUsersResponse } from "./types";
import { prisma, VSCreateUsers } from "@/libs";
import { getAccounts, getUserbyEmail } from "@/utilities";

export const createUsers = async (
  req: Request<TUsersRequest>,
  res: Response<TUsersResponse>,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone_number }: TUsersRequest = req.body;
    VSCreateUsers.parse(req.body);
    const existEmail = await getUserbyEmail(email);
    const accounts = await getAccounts();
    const existPhoneNumber = accounts.find(
      (item) => item.phone_number === phone_number
    )?.phone_number;

    if (existEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email already exist",
      });
    }

    if (existPhoneNumber === phone_number) {
      return res.status(400).json({
        status: "error",
        message: "Phone number already exist",
      });
    }

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

export const getUser = async (
  req: Request,
  res: Response<TUsersResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: "error",
        message: `User with id ${id} was not found`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "User retrieved",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
