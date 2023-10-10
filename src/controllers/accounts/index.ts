import { NextFunction, Request, Response } from "express";
import { TAccountsRequest, TAccountsResponse } from "./types";
import { prisma, VSCreateAccount } from "@/libs";

export const updateAccounts = async (
  req: Request<TAccountsRequest>,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const { username, address }: TAccountsRequest = req.body;
    VSCreateAccount.parse(req.body);
    const account = await prisma.accounts.update({
      where: {
        id: req.params.id,
      },
      data: {
        username,
        address,
      },
      select: {
        id: true,
        username: true,
        address: true,
        phone_number: true,
        user_id: true,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Account updated successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAccounts = async (
  req: Request,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const accounts = await prisma.accounts.findMany({
      select: {
        id: true,
        username: true,
        address: true,
        phone_number: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Accounts retrieved successfully",
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
};
