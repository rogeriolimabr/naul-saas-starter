interface Sort {
  orderBy: string[]
  sorted: boolean
}

interface Pageable {
  number: number
  offset: number
  size: number
  sort: Sort
  sorted: boolean
}
export interface Response<T> {
  empty: boolean
  numberOfElements: number
  offset: number
  pageNumber: number
  pageable: Pageable
  size: number
  totalPages: number
  totalSize: number
  content: T[]
}
