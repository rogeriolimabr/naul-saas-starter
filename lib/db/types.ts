import { SortingState } from "@tanstack/react-table"

export interface PaginationOption {
  pageSize: number // Número de itens por página
  pageIndex: number // Indice da página atual (começando do 0)
}

export interface FilterOption {
  column: string
  value: string
}

export interface QueryOptions {
  globalSearch?: string // Termo de busca global
  sorting?: SortingState // Colunas para ordenar
  pagination?: PaginationOption // Opções de paginação
  filters?: FilterOption[]
}

export interface Pagination {
  pageIndex: number
  pageSize: number
  total: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface ResponseTable<T> {
  records: T[]
  pagination: Pagination
  sorting: SortingState
}