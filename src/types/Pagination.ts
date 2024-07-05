
export type Pagination={
  pageSize: number,
  pageNumber: number,
  totalPages: number,
  numberOfElements: number,
  totalElements: number,
  first: boolean,
  last: boolean,
  empty: boolean
}

export interface Response<T> {
  data: T;
  pagination: Pagination;
}