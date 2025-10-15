export const buildPagination = (query = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1)
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100)
  const offset = (page - 1) * limit
  const sort = query.sort || '-createdAt'

  return { page, limit, offset, sort }
}

export const applyRange = (query = {}) => {
  const from = query.from ? new Date(query.from) : undefined
  const to = query.to ? new Date(query.to) : undefined
  return { from, to }
}

export const paginatedResponse = ({ rows, count }, { page, limit }) => {
  return {
    items: rows,
    page,
    limit,
    total: count,
  }
}
