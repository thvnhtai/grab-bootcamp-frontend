type Pagination = {
  page: number;
  size: number;
  total: number;
};

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  metadata?: Pagination;
};

type PaginatedResponse<T> = {
  status: number;
  message: string;
  data: T[];
  metadata: Pagination;
};

type ErrorPayload = {
  status: number;
  message: string;
};

export { Pagination, ApiResponse, PaginatedResponse, ErrorPayload };
