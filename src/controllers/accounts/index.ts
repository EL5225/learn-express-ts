import { NextFunction, Request, Response } from "express";
import {
  TAccountCreateRequest,
  TAccountsResponse,
  TAccountsUpdateRequest,
} from "./types";
import { prisma, VSCreateAccount, VSUpdateAccount } from "@/libs";
import { getAccounts } from "@/utilities";

export const createAccounts = async (
  req: Request<TAccountCreateRequest>,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const { username, address, phone_number, user_id }: TAccountCreateRequest =
      req.body;
    VSCreateAccount.parse(req.body);

    const existAccount = await prisma.accounts.findUnique({
      where: {
        user_id,
      },
    });

    if (existAccount) {
      return res.status(400).json({
        status: "error",
        message: "This user already have an account",
      });
    }

    const account = await prisma.accounts.create({
      data: {
        username,
        address,
        phone_number,
        user_id,
      },
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

    res.status(201).json({
      status: "success",
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAccounts = async (
  req: Request<TAccountsUpdateRequest>,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const { username, address }: TAccountsUpdateRequest = req.body;
    const { id } = req.params;
    VSUpdateAccount.parse(req.body);

    const account = await prisma.accounts.update({
      where: {
        id,
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

export const getAccount = async (
  req: Request<{ id: string }>,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const account = await prisma.accounts.findUnique({
      where: {
        id,
      },
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
      message: "Account retrieved successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request<{ id: string }>,
  res: Response<TAccountsResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const account = await prisma.accounts.delete({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        address: true,
        phone_number: true,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Account deleted",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};
