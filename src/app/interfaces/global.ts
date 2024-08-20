export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface IResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data: T | null | undefined;
}
