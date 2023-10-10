import { createUsers, getUser, getUsers } from "@/controllers";
import { Router } from "express";

const users = Router();

users.post("/", createUsers);
users.get("/", getUsers);
users.get("/:id", getUser);

export default users;
