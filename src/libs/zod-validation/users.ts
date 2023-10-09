import { z } from "zod";
import { Prisma } from "@prisma/client";

export const VSCreateUsers = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(13, { message: "Phone number must be at most 13 digits" }),
}) satisfies z.Schema<Prisma.UsersCreateInput>;
