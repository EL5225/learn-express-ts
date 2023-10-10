import { TGenericResponse } from "@/utilities";

export type TAccountsUpdateRequest = {
  id: string;
  username: string | null;
  address: string | null;
};

export type TAccountCreateRequest = TAccountsUpdateRequest & {
  phone_number: string | null;
  user_id: string;
};

export type TAccountsResponse = TGenericResponse<
  string,
  TAccountsUpdateRequest & {
    phone_number?: string | null;
    user?: { id: string; name: string; email: string; createdAt: Date };
    user_id?: string | null;
  }
>;
