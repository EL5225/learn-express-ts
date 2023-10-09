import { TGenericResponse } from "@/utilities";

export type TUsersRequest = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};

export type TUsersResponse = TGenericResponse<
  string,
  { id: string; name: string; email: string; createdAt: Date }
>;
