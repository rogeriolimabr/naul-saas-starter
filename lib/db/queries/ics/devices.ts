'use server'

import { asc, desc, like, or, sql, eq, and } from 'drizzle-orm' // Funções de comparação e ordenação
import { db } from '../../drizzle' // Sua instância de conexão com o banco
import { QueryOptions, ResponseTable } from '../../types'
import { devices, Device } from '../../schema'
import { type AddDeviceValues } from '@/lib/validations/ics/devices'

export async function getAllDevices(
  options: QueryOptions
): Promise<ResponseTable<Device>> {
  const { globalSearch, sorting, pagination, filters } = options

  type SortableFields = 'name' | 'status' | 'vendor' | 'product' | 'version' | 'dork' | 'createdAt' | 'updatedAt'
  type FilteredFields = 'name' | 'status' | 'vendor' | 'product' | 'version'

  const filterMapping: Record<FilteredFields, any> = {
    name: devices.name,
    status: devices.status,
    vendor: devices.vendor,
    product: devices.product,
    version: devices.version
  }

  const sortMapping: Record<SortableFields, any> = {
    name: devices.name,
    status: devices.status,
    vendor: devices.vendor,
    product: devices.product,
    version: devices.version,
    dork: devices.dork,
    createdAt: devices.createdAt,
    updatedAt: devices.updatedAt,
  }

  let query = db.select().from(devices)

  const totalItemsQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(devices)

  // 1. Global Search
  if (globalSearch) {
    query.where(
      or(
        like(devices.name, `%${globalSearch}%`),
        like(devices.vendor, `%${globalSearch}%`),
        like(devices.product, `%${globalSearch}%`),
        like(devices.version, `%${globalSearch}%`),
        like(devices.dork, `%${globalSearch}%`),
      )
    )

    totalItemsQuery.where(
      or(
        like(devices.name, `%${globalSearch}%`),
        like(devices.vendor, `%${globalSearch}%`),
        like(devices.product, `%${globalSearch}%`),
        like(devices.version, `%${globalSearch}%`),
        like(devices.dork, `%${globalSearch}%`),
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
    } as ResponseTable<Device>
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
  } as ResponseTable<Device>
}

export async function getDevice(id: string): Promise<Device | null> {
  const result = await db.select().from(devices).where(eq(devices.id, id))
  return result[0] || null
}

export async function addDevice(data: AddDeviceValues) {
  const result = await db.insert(devices).values(data).returning()
  return result[0]
}