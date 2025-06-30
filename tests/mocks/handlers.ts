// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import type { Creator } from '~/lib/client'
import { categoriesData, creatorsData, historyData } from '../data'

// Working copy of data for tests (allows mutations during testing)
let workingCreators: Creator[] = []
let workingHistory: any[] = []

// Initialize working data from CSV
function initializeWorkingData() {
  if (workingCreators.length === 0) {
    // Convert null to undefined for image_url to match Creator interface
    workingCreators = creatorsData().map(creator => ({
      ...creator,
      image_url: creator.image_url ?? undefined
    }))
    workingHistory = historyData().map(record => ({ ...record }))
    // eslint-disable-next-line no-console
    console.log(
      `🎭 MSW initialized with ${workingCreators.length} creators and ${workingHistory.length} history records`
    )
  }
}

// Reset working data (useful between tests)
export function resetWorkingData() {
  workingCreators = []
  workingHistory = []
}

// Parse Supabase range header: "0-19" -> { start: 0, end: 19 }
function parseRange(rangeHeader: string | null): { start: number; end: number } | null {
  if (!rangeHeader) return null
  const [start, end] = rangeHeader.split('-').map(Number)
  return { start, end }
}

// Parse Supabase order parameter: "category.asc,name.desc"
function parseOrder(orderParam: string | null): Array<{ field: string; ascending: boolean }> {
  if (!orderParam) return []

  return orderParam.split(',').map(part => {
    const [field, direction] = part.split('.')
    return { field, ascending: direction !== 'desc' }
  })
}

// Apply sorting to array
function applySorting<T>(data: T[], orders: Array<{ field: string; ascending: boolean }>): T[] {
  if (orders.length === 0) return data

  return [...data].sort((a, b) => {
    for (const { field, ascending } of orders) {
      const aVal = (a as Record<string, unknown>)[field]
      const bVal = (b as Record<string, unknown>)[field]

      let comparison = 0
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      }

      if (comparison !== 0) {
        return ascending ? comparison : -comparison
      }
    }
    return 0
  })
}

// Apply filters based on query parameters
function applyFilters(data: Creator[], params: URLSearchParams): Creator[] {
  let filtered = [...data]

  for (const [key, value] of params.entries()) {
    if (key === 'name' && value.startsWith('ilike.')) {
      const searchTerm = value.replace('ilike.', '').replace(/%/g, '')
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (key === 'category' && value.startsWith('ilike.')) {
      const searchTerm = value.replace('ilike.', '').replace(/%/g, '')
      filtered = filtered.filter(creator =>
        creator.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (key === 'description' && value.startsWith('ilike.')) {
      const searchTerm = value.replace('ilike.', '').replace(/%/g, '')
      filtered = filtered.filter(creator =>
        creator.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }

  return filtered
}

export const handlers = [
  // GET /rest/v1/creators - Main creators query
  http.get('*/rest/v1/creators', ({ request }) => {
    initializeWorkingData()

    const url = new URL(request.url)
    const rangeHeader = request.headers.get('range')
    const orderParam = url.searchParams.get('order')

    // Apply filters
    let filteredCreators = applyFilters(workingCreators, url.searchParams)

    // Apply sorting (default to category.asc,name.asc if no order specified)
    const orders = parseOrder(orderParam) || [
      { field: 'category', ascending: true },
      { field: 'name', ascending: true }
    ]
    filteredCreators = applySorting(filteredCreators, orders)

    // Store the total count BEFORE pagination for Supabase-style count behavior
    const totalFilteredCount = filteredCreators.length

    // Apply pagination
    const range = parseRange(rangeHeader)
    let paginatedCreators = filteredCreators
    if (range) {
      // Handle out-of-range requests gracefully
      if (range.start >= filteredCreators.length) {
        // Request is beyond available data - return empty but valid response
        paginatedCreators = []
      } else {
        paginatedCreators = filteredCreators.slice(range.start, range.end + 1)
      }
    }

    // Calculate proper Content-Range header
    const startIndex = range?.start || 0
    const endIndex =
      paginatedCreators.length > 0 ? startIndex + paginatedCreators.length - 1 : startIndex - 1 // For empty results, end = start - 1

    // Always use the TOTAL count, not filtered count for empty pages
    const totalCount = workingCreators.length // Use full dataset count

    return HttpResponse.json(paginatedCreators, {
      headers: {
        'Content-Range': `${startIndex}-${endIndex}/${totalCount}`,
        'Content-Type': 'application/json'
      }
    })
  }),

  // GET /rest/v1/categories - Categories view
  http.get('*/rest/v1/categories', () => {
    const categories = categoriesData().map(category => ({ category }))
    return HttpResponse.json(categories)
  }),

  // GET /rest/v1/creator_history - History query
  http.get('*/rest/v1/creator_history', ({ request }) => {
    initializeWorkingData()

    const url = new URL(request.url)
    const rangeHeader = request.headers.get('range')
    const orderParam = url.searchParams.get('order')

    let filteredHistory = [...workingHistory]

    // Apply action filter
    const actionParam = url.searchParams.get('action')
    if (actionParam && actionParam.startsWith('eq.')) {
      const action = actionParam.replace('eq.', '')
      filteredHistory = filteredHistory.filter(record => record.action === action)
    }

    // Apply date filters
    const dateFromParam = url.searchParams.get('action_date')
    if (dateFromParam && dateFromParam.startsWith('gte.')) {
      const dateFrom = dateFromParam.replace('gte.', '')
      filteredHistory = filteredHistory.filter(record => record.action_date >= dateFrom)
    }

    const dateToParam = url.searchParams.get('action_date')
    if (dateToParam && dateToParam.startsWith('lte.')) {
      const dateTo = dateToParam.replace('lte.', '')
      filteredHistory = filteredHistory.filter(record => record.action_date <= dateTo)
    }

    // Apply sorting (default to action_date.desc)
    const orders = parseOrder(orderParam) || [{ field: 'action_date', ascending: false }]
    filteredHistory = applySorting(filteredHistory, orders)

    // Apply pagination
    const range = parseRange(rangeHeader)
    let paginatedHistory = filteredHistory
    if (range) {
      paginatedHistory = filteredHistory.slice(range.start, range.end + 1)
    }

    return HttpResponse.json(paginatedHistory, {
      headers: {
        'Content-Range': `0-${paginatedHistory.length - 1}/${filteredHistory.length}`,
        'Content-Type': 'application/json'
      }
    })
  }),

  // POST /rest/v1/creators - Create creator
  http.post('*/rest/v1/creators', async ({ request }) => {
    initializeWorkingData()

    const newCreatorData = (await request.json()) as Omit<
      Creator,
      'id' | 'created_at' | 'updated_at'
    >

    const newCreator: Creator = {
      ...newCreatorData,
      id: Math.max(...workingCreators.map(c => c.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    workingCreators.push(newCreator)
    return HttpResponse.json(newCreator, { status: 201 })
  }),

  // PATCH /rest/v1/creators - Update creator
  http.patch('*/rest/v1/creators', async ({ request }) => {
    initializeWorkingData()

    const url = new URL(request.url)
    const idParam = url.searchParams.get('id')

    if (!idParam || !idParam.startsWith('eq.')) {
      return HttpResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const id = parseInt(idParam.replace('eq.', ''))
    const updates = (await request.json()) as Partial<Creator>

    const creatorIndex = workingCreators.findIndex(c => c.id === id)
    if (creatorIndex === -1) {
      return HttpResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    workingCreators[creatorIndex] = {
      ...workingCreators[creatorIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }

    return HttpResponse.json(workingCreators[creatorIndex])
  }),

  // DELETE /rest/v1/creators - Delete creator
  http.delete('*/rest/v1/creators', ({ request }) => {
    initializeWorkingData()

    const url = new URL(request.url)
    const idParam = url.searchParams.get('id')

    if (!idParam || !idParam.startsWith('eq.')) {
      return HttpResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const id = parseInt(idParam.replace('eq.', ''))
    const creatorIndex = workingCreators.findIndex(c => c.id === id)

    if (creatorIndex === -1) {
      return HttpResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    workingCreators.splice(creatorIndex, 1)
    return HttpResponse.json({}, { status: 204 })
  }),

  // RPC call for search suggestions
  http.post('*/rest/v1/rpc/get_search_words_with_filters', async ({ request }) => {
    initializeWorkingData()

    const body = (await request.json()) as { search_term: string; existing_tags: unknown }
    const { search_term } = body

    if (!search_term || search_term.length < 2) {
      return HttpResponse.json([])
    }

    const suggestions: Array<{
      source_type: string
      match_words: string
      highlighted_text: string
      category: string
    }> = []
    const searchLower = search_term.toLowerCase()

    // Search in names
    workingCreators.forEach(creator => {
      if (creator.name.toLowerCase().includes(searchLower)) {
        suggestions.push({
          source_type: 'name',
          match_words: creator.name,
          highlighted_text: creator.name.replace(new RegExp(search_term, 'gi'), '<mark>$&</mark>'),
          category: creator.category
        })
      }
    })

    // Search in categories
    const uniqueCategories = Array.from(new Set(workingCreators.map(c => c.category)))
    uniqueCategories.forEach(category => {
      if (category.toLowerCase().includes(searchLower)) {
        suggestions.push({
          source_type: 'category',
          match_words: category,
          highlighted_text: category.replace(new RegExp(search_term, 'gi'), '<mark>$&</mark>'),
          category: category
        })
      }
    })

    // Search in descriptions (limit to prevent too many results)
    workingCreators.slice(0, 20).forEach(creator => {
      if (creator.description.toLowerCase().includes(searchLower)) {
        suggestions.push({
          source_type: 'description',
          match_words: search_term,
          highlighted_text: creator.description
            .substring(0, 100)
            .replace(new RegExp(search_term, 'gi'), '<mark>$&</mark>'),
          category: creator.category
        })
      }
    })

    return HttpResponse.json(suggestions.slice(0, 10)) // Limit results
  }),

  // RPC call for restore diff
  http.post('*/rest/v1/rpc/get_creator_restore_diff', async ({ request }) => {
    const body = (await request.json()) as { history_record_id: number }

    // Mock restore diff - would normally compare current vs historical data
    const mockDiff = [
      {
        field_name: 'name',
        current_value: 'Current Name',
        restore_value: 'Historical Name',
        will_change: true
      },
      {
        field_name: 'description',
        current_value: 'Current Description',
        restore_value: 'Current Description',
        will_change: false
      }
    ]

    return HttpResponse.json(mockDiff)
  }),

  // RPC call for cleanup history
  http.post('*/rest/v1/rpc/cleanup_creator_history', () => {
    return HttpResponse.json({ success: true })
  }),

  // Error simulation handlers
  http.get('*/rest/v1/creators-error', () => {
    return HttpResponse.json(
      { error: 'Database connection failed', code: 'DB_ERROR' },
      { status: 500 }
    )
  })
]
