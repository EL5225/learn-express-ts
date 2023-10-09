import { createUsers, getUsers } from "@/controllers";
import { Router } from "express";

const users = Router();

users.post("/", createUsers);
users.get("/", getUsers);

export default users;
