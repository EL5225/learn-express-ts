export type TGenericResponse<T, K> = {
  status: T;
  message: string;
  data?: K[] | K | null;
};

export type TErrorResponse<T, K> = {
  status: T;
  message: string;
  error?: K[] | K | null;
};

export type TPublicResponses = TGenericResponse<boolean, null>;
