export type PaginatedData<T> = {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export type InfinityQueryResponse<T> = {
  pages: T[];
  pageParams: number[];
};

export type Params = {
  page: number;
  limit: number;
};
