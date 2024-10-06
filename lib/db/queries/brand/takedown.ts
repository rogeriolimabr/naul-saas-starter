'use server'

import { asc, desc, like, or, sql, eq } from 'drizzle-orm' // Funções de comparação e ordenação
import { db } from '../../drizzle' // Sua instância de conexão com o banco
import { QueryOptions, ResponseTable } from '../../types'
import { Takedown, takedowns } from '../../schema'

export async function getAllTakedowns(
  options: QueryOptions
): Promise<ResponseTable<Takedown>> {
  const { globalSearch, sorting, pagination, filters } = options

  type SortableFields = 'name' | 'url' | 'status' | 'createdAt' | 'updatedAt'
  type FilteredFields = 'name' | 'status' | 'type' | 'origin'

  const filterMapping: Record<FilteredFields, any> = {
    name: takedowns.name,
    status: takedowns.status,
    type: takedowns.type,
    origin: takedowns.origin,
  }

  const sortMapping: Record<SortableFields, any> = {
    name: takedowns.name,
    url: takedowns.url,
    status: takedowns.status,
    createdAt: takedowns.createdAt,
    updatedAt: takedowns.updatedAt,
  }

  let query = db.select().from(takedowns)

  const totalItemsQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(takedowns)

  // 1. Global Search
  if (globalSearch) {
    query.where(
      or(
        like(takedowns.name, `%${globalSearch}%`),
        like(takedowns.description, `%${globalSearch}%`),
        like(takedowns.url, `%${globalSearch}%`)
      )
    )

    totalItemsQuery.where(
      or(
        like(takedowns.name, `%${globalSearch}%`),
        like(takedowns.description, `%${globalSearch}%`),
        like(takedowns.url, `%${globalSearch}%`)
      )
    )
  }

  // 2. Filters
  if (filters) {
    filters.forEach(({ column, value }) => {
      if (column in filterMapping && value) {
        query.where(eq(filterMapping[column as FilteredFields], value))
        totalItemsQuery.where(
          eq(filterMapping[column as FilteredFields], value)
        )
      }
    })
  }

  // 3. Sorting
  if (sorting) {
    sorting.forEach(({ id, desc: isDesc }) => {
      if (id in sortMapping) {
        const column = sortMapping[id as SortableFields] // Casting para garantir que id seja uma chave válida
        query.orderBy(isDesc ? desc(column) : asc(column))
      }
    })
  }

  // 4. Pagination
  if (pagination) {
    const { pageIndex, pageSize } = pagination

    const totalQueryResult = await totalItemsQuery
    const total = totalQueryResult[0].count

    const totalPages = Math.ceil(total / pagination.pageSize) // Total de páginas

    const results = await query.limit(pageSize).offset(pageSize * pageIndex) // Página atual baseada no currentPage

    const hasPreviousPage = pageIndex > 0
    const hasNextPage = pageIndex < totalPages - 1

    return {
      data: results as Takedown[], // Resultado da query
      pagination: {
        pageIndex,
        pageSize,
        total,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
      sorting: sorting || [], // Ordenação usada, se houver
    } as ResponseTable<Takedown>
  }

  // 5. Without Pagination
  const results = await query

  return {
    data: results as Takedown[],
    pagination: {
      pageIndex: 0,
      pageSize: results.length,
      total: results.length,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
    sorting: sorting || [],
  } as ResponseTable<Takedown>
}
