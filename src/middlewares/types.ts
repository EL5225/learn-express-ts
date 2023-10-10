import { TErrorResponse } from "@/utilities";

export type TZodErrorResponse = TErrorResponse<
  string,
  { name: string; detail: string }
>;
