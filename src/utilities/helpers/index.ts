export type TGenericResponse<T, k> = {
  status: T;
  message: string;
  data: k[] | k | null;
};
