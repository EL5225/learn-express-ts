import { Prisma } from "@prisma/client";
import { z } from "zod";

export const VSCreateAccount = z.object({
  username: z.string({ required_error: "Username is required" }),
  address: z.string({ required_error: "Address is required" }),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(13, { message: "Phone number must be at most 13 digits" }),
  user_id: z.string({ required_error: "User id is required" }),
}) satisfies z.Schema<Prisma.AccountsCreateWithoutUserInput>;

export const VSUpdateAccount = z.object({
  username: z.string({ required_error: "Username is required" }),
  address: z.string({ required_error: "Address is required" }),
});
