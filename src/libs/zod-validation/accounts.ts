import { Prisma } from "@prisma/client";
import { z } from "zod";

export const VSCreateAccount = z.object({
  username: z.string({ required_error: "Username is required" }),
  address: z.string({ required_error: "Address is required" }),
}) satisfies z.Schema<Prisma.AccountsCreateWithoutUserInput>;
