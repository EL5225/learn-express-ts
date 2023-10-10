export type TGenericResponse<T, k> = {
  status: T;
  message: string;
  data?: k[] | k | null;
};

export type TErrorResponse<T, k> = {
  status: T;
  message: string;
  error?: k[] | k | null;
};

export type TPublicResponses = TGenericResponse<boolean, null>;
