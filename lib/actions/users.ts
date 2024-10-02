'use server'

import {
  PaginationState,
  SortingState,
  GlobalFilterTableState,
} from '@tanstack/react-table'
import { db } from '../db/drizzle'
import { users } from '../db/schema'
import { asc, desc, like, or } from 'drizzle-orm'

type TableProps = {
  globalSearch?: string
  pagination: PaginationState
  sorting: SortingState
}

// Definindo um tipo para as chaves do schema
type UserColumns = keyof typeof users;

export const getAllUsers = async ({ globalSearch, pagination, sorting }: TableProps) => {
  // Iniciando a query
  const query = db.select().from(users)

  if (globalSearch) {
    query.where(
        or(
            like(users.name, `%${globalSearch}%`),
            like(users.email, `%${globalSearch}%`)
    ))
  }

  // Aplicar ordenação
  if (sorting && sorting.length > 0) {
    sorting.forEach(({ id, desc: isDesc }) => {
      query.orderBy(isDesc ? desc(users[id as UserColumns]) : asc(users[id as UserColumns]) )
    })
  }

  // Aplicar paginação
  const pageSize = pagination?.pageSize || 10 // Valor padrão para pageSize
  const currentPage = pagination?.pageIndex || 0 // Valor padrão para page
  query.limit(pageSize).offset(currentPage * pageSize)

  // Executar a query e retornar os resultados
  const data = await query

  // Obter o total de registros
  const total = data.length ?? 0

  return {
    data,
    total,
    currentPage,
    pageSize,
  }
  
}
