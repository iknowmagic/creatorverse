import { vi } from 'vitest'
import { testData } from '../data'

export function createSupabaseMock() {
  // Create individual mock functions
  const mockEq = vi.fn()
  const mockIlike = vi.fn()
  const mockNot = vi.fn()
  const mockNeq = vi.fn()
  const mockGte = vi.fn()
  const mockLte = vi.fn()
  const mockOrder = vi.fn()
  const mockRange = vi.fn()
  const mockSelect = vi.fn()
  const mockFrom = vi.fn()
  const mockRpc = vi.fn()
  const mockUpdate = vi.fn()
  const mockInsert = vi.fn()
  const mockDelete = vi.fn()
  const mockSingle = vi.fn()

  // Default resolved value with proper structure
  const defaultResolvedValue = { data: [], error: null, count: 0 }

  // Chain the methods properly - CRITICAL: All terminal operations must return promises
  mockEq.mockResolvedValue(defaultResolvedValue)
  mockNeq.mockResolvedValue(defaultResolvedValue) // This was missing and causing clearHistory to fail
  mockGte.mockReturnValue({ lte: mockLte })
  mockLte.mockResolvedValue(defaultResolvedValue)
  mockSingle.mockResolvedValue({ data: null, error: null })

  // Order can chain further or terminate
  mockOrder.mockImplementation(() => ({
    // Can be terminal (return promise)
    then: (onResolve: any) => onResolve(defaultResolvedValue),
    // Or continue chaining
    eq: mockEq,
    neq: mockNeq,
    ilike: mockIlike,
    gte: mockGte,
    lte: mockLte,
    not: mockNot
  }))

  // Ilike can chain or terminate
  mockIlike.mockReturnValue({
    eq: mockEq,
    neq: mockNeq,
    ilike: mockIlike,
    order: mockOrder,
    then: (onResolve: any) => onResolve(defaultResolvedValue)
  })

  // Not can chain or terminate
  mockNot.mockReturnValue({
    order: mockOrder,
    eq: mockEq,
    neq: mockNeq,
    then: (onResolve: any) => onResolve(defaultResolvedValue)
  })

  // Range must chain to order
  mockRange.mockReturnValue({
    order: mockOrder
  })

  // Select can chain to multiple operations
  mockSelect.mockReturnValue({
    range: mockRange,
    order: mockOrder,
    not: mockNot,
    eq: mockEq,
    neq: mockNeq,
    ilike: mockIlike,
    gte: mockGte,
    lte: mockLte,
    single: mockSingle
  })

  // Update chains to eq for WHERE clause
  mockUpdate.mockReturnValue({
    eq: mockEq,
    neq: mockNeq
  })

  // Insert is terminal
  mockInsert.mockResolvedValue(defaultResolvedValue)

  // Delete can chain to multiple WHERE clauses - THIS WAS THE MISSING PIECE
  mockDelete.mockReturnValue({
    eq: mockEq,
    neq: mockNeq, // This was missing, causing "neq is not a function" error
    gte: mockGte,
    lte: mockLte,
    // Also allow direct resolution for simple deletes
    then: (onResolve: any) => onResolve(defaultResolvedValue)
  })

  // From returns the query builder
  mockFrom.mockReturnValue({
    select: mockSelect,
    update: mockUpdate,
    insert: mockInsert,
    delete: mockDelete
  })

  // Main supabase client
  const supabase = {
    from: mockFrom,
    rpc: mockRpc,
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: null, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null })
    }
  }

  return {
    supabase,
    mocks: {
      from: mockFrom,
      select: mockSelect,
      range: mockRange,
      order: mockOrder,
      eq: mockEq,
      neq: mockNeq,
      ilike: mockIlike,
      not: mockNot,
      gte: mockGte,
      lte: mockLte,
      rpc: mockRpc,
      update: mockUpdate,
      insert: mockInsert,
      delete: mockDelete,
      single: mockSingle
    }
  }
}

export const mockResponses = {
  creators: testData.creators,
  history: testData.history,
  categories: testData.categories,

  search: (term: string) => [
    {
      source_type: 'name',
      match_words: term,
      highlighted_text: `<mark>${term}</mark>`,
      category: 'Test Category'
    }
  ],

  restoreDiff: () => [
    {
      field_name: 'name',
      current_value: 'Current Name',
      restore_value: 'Historical Name',
      will_change: true
    }
  ]
}
