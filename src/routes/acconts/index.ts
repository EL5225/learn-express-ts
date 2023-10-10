import { getAllAccounts, updateAccounts } from "@/controllers";
import { Router } from "express";

const account = Router();

account.put("/:id", updateAccounts);
account.get("/", getAllAccounts);
// account.get("/:id", getUser);

export default account;
