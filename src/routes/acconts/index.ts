import {
  createAccounts,
  deleteAccount,
  getAccount,
  getAllAccounts,
  updateAccounts,
} from "@/controllers";
import { Router } from "express";

const account = Router();

account.post("/", createAccounts);
account.put("/:id", updateAccounts);
account.get("/", getAllAccounts);
account.get("/:id", getAccount);
account.delete("/:id", deleteAccount);

export default account;
