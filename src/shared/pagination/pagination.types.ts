export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedData<T> {
  data: T[];
  total: number;
}

export interface PaginatedResponse<T>
  extends PaginatedData<T>, PaginationParams {}
