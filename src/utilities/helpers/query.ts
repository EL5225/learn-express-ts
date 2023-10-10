import { prisma } from "@/libs";

export const getUserbyEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};

export const getAccounts = async () => {
  return await prisma.accounts.findMany();
};
