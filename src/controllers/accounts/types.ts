import { TGenericResponse } from "@/utilities";

export type TAccountsRequest = {
  id: string;
  username: string | null;
  address: string | null;
};

export type TAccountsResponse = TGenericResponse<
  string,
  TAccountsRequest & {
    phone_number?: string | null;
    user?: { id: string; name: string; email: string; createdAt: Date };
    user_id?: string | null;
  }
>;
