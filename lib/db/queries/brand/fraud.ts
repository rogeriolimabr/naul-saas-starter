'use server'

import { asc, desc, like, or, sql, eq, and } from 'drizzle-orm' // Funções de comparação e ordenação
import { db } from '../../drizzle' // Sua instância de conexão com o banco
import { QueryOptions, ResponseTable } from '../../types'
import { trackings, Tracking } from '../../schema'

export async function getAllFraudProtection(
  options: QueryOptions
): Promise<ResponseTable<Tracking>> {
  const { globalSearch, sorting, pagination, filters } = options

  type SortableFields = 'name' | 'status' | 'category' | 'priority' | 'frequency' | 'createdAt' | 'updatedAt'
  type FilteredFields = 'name' | 'status' | 'category' | 'priority' | 'frequency'

  const filterMapping: Record<FilteredFields, any> = {
    name: trackings.name,
    status: trackings.status,
    category: trackings.category,
    priority: trackings.priority,
    frequency: trackings.frequency,
  }

  const sortMapping: Record<SortableFields, any> = {
    name: trackings.name,
    status: trackings.status,
    category: trackings.category,
    priority: trackings.priority,
    frequency: trackings.frequency,
    createdAt: trackings.createdAt,
    updatedAt: trackings.updatedAt,
  }

  let query = db.select().from(trackings)

  const totalItemsQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(trackings)

  // 1. Global Search
  if (globalSearch) {
    query.where(
      or(
        like(trackings.name, `%${globalSearch}%`),
        like(trackings.description, `%${globalSearch}%`),
      )
    )

    totalItemsQuery.where(
      or(
        like(trackings.name, `%${globalSearch}%`),
        like(trackings.description, `%${globalSearch}%`),
      )
    )
  }

  // 2. Filters
  if (filters && filters.length > 0) {
    const conditions = filters.reduce((acc, { column, value }) => {
      if (column in filterMapping && value) {
        // Adiciona uma nova condição para a lista de condições
        acc.push(eq(filterMapping[column as FilteredFields], value));
      }
      return acc;
    }, [] as Array<ReturnType<typeof eq>>);
  
    // Aplica as condições combinadas usando 'and'
    if (conditions.length > 0) {
       query.where(and(...conditions));
       totalItemsQuery.where(and(...conditions));
    }
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

    const records = await query.limit(pageSize).offset(pageSize * pageIndex) // Página atual baseada no currentPage

    const hasPreviousPage = pageIndex > 0
    const hasNextPage = pageIndex < totalPages - 1

    return {
      records,
      pagination: {
        pageIndex,
        pageSize,
        total,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
      sorting: sorting || [], // Ordenação usada, se houver
    } as ResponseTable<Tracking>
  }

  // 5. Without Pagination
  const records = await query

  return {
    records,
    pagination: {
      pageIndex: 0,
      pageSize: records.length,
      total: records.length,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
    sorting: sorting || [],
  } as ResponseTable<Tracking>
}

export async function getFraudProtection(id: string): Promise<Tracking | null> {
  const result = await db.select().from(trackings).where(eq(trackings.id, id))
  return result[0] || null
}