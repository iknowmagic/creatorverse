import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testData } from '~/../tests/data'
import { createSupabaseMock } from '~/../tests/mocks/supabase'
import type { PaginationState, SearchTag, SortingState } from '../types'

// Mock Supabase
vi.mock('~/lib/client', () => createSupabaseMock())

import { supabase } from '~/lib/client'
import { useCreators } from '../useCreators'

describe('useCreators Hook', () => {
  const defaultParams = {
    pagination: { pageIndex: 0, pageSize: 20 } as PaginationState,
    sorting: [] as SortingState[],
    searchTags: [] as SearchTag[]
  }

  // Updated helper function to handle multiple .ilike() calls properly
  const createMockChain = (data: any, count: number, hasError = false) => {
    const mockOrderFn = vi.fn()
    const mockIlikeFn = vi.fn()

    const chainResult = {
      order: mockOrderFn,
      ilike: mockIlikeFn,
      then: (resolve: any) =>
        resolve(
          hasError
            ? { data: null, count: null, error: { message: 'Database error' } }
            : { data, count, error: null }
        )
    }

    // Make order return the same chainable object
    mockOrderFn.mockReturnValue(chainResult)
    // Make ilike return the same chainable object (for chaining multiple ilike calls)
    mockIlikeFn.mockReturnValue(chainResult)

    return {
      select: vi.fn().mockReturnValue({
        range: vi.fn().mockReturnValue(chainResult)
      })
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State & Loading', () => {
    it('should initialize with correct default state', () => {
      // Create a controlled promise to test initial state
      let resolvePromise: (value: any) => void
      const controlledPromise = new Promise(resolve => {
        resolvePromise = resolve
      })

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          range: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockReturnValue(controlledPromise)
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      // Check initial state immediately
      expect(result.current.isLoading).toBe(true)
      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)
      expect(typeof result.current.refetch).toBe('function')

      // Resolve promise to complete the test
      resolvePromise!({ data: [], count: 0, error: null })
    })

    it('should fetch creators successfully with default sorting', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)
      expect(result.current.error).toBe(null)

      // Verify Supabase calls
      expect(supabase.from).toHaveBeenCalledWith('creators')
      const mockSelect = vi.mocked(supabase.from).mock.results[0].value.select
      expect(mockSelect).toHaveBeenCalledWith('*', { count: 'exact' })
    })
  })

  describe('Pagination', () => {
    it('should handle first page correctly', async () => {
      const pageSize = 15
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 0, pageSize }
      }

      const mockCreators = testData.creators.page(0, pageSize)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(Math.min(pageSize, totalCount))
      expect(result.current.totalCount).toBe(totalCount)

      // Verify range call with correct parameters
      const mockRange = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range
      expect(mockRange).toHaveBeenCalledWith(0, 14) // pageSize - 1
    })

    it('should handle second page correctly', async () => {
      const pageSize = 20
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 1, pageSize }
      }

      const mockCreators = testData.creators.page(1, pageSize)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify range call for second page
      const mockRange = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range
      expect(mockRange).toHaveBeenCalledWith(20, 39) // second page: 20-39
    })

    it('should handle large page size', async () => {
      const pageSize = 100
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 0, pageSize }
      }

      const mockCreators = testData.creators.page(0, pageSize)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(Math.min(pageSize, totalCount))
      expect(result.current.totalCount).toBe(totalCount)
    })
  })

  describe('Sorting', () => {
    it('should apply custom sorting', async () => {
      const params = {
        ...defaultParams,
        sorting: [
          { id: 'name', desc: false },
          { id: 'category', desc: true }
        ] as SortingState[]
      }

      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify order calls were made for each sort
      const mockOrder = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order
      expect(mockOrder).toHaveBeenCalledTimes(2) // Two sorting columns
    })

    it('should use default sorting when no sorting provided', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Verify default sorting was applied (category, then name)
      const mockOrder = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order
      expect(mockOrder).toHaveBeenCalledTimes(2) // Default: category + name
    })
  })

  describe('Search Filtering', () => {
    it('should filter by name', async () => {
      const params = {
        ...defaultParams,
        searchTags: [{ type: 'name', value: 'test', displayText: 'test' }] as SearchTag[]
      }

      // Use the existing page method and filter manually for testing
      const allCreators = testData.creators.page(0, 1000) // Get all creators
      const mockCreators = allCreators.filter(c => c.name.toLowerCase().includes('test'))
      const totalCount = mockCreators.length

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify ilike was called for name search
      const mockIlike = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order.mock.results[0].value.order.mock.results[0].value.ilike
      expect(mockIlike).toHaveBeenCalledWith('name', '%test%')
    })

    it('should filter by category', async () => {
      const testCategory = testData.categories.all()[0]
      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'category', value: testCategory, displayText: testCategory }
        ] as SearchTag[]
      }

      const mockCreators = testData.creators.byCategory(testCategory)
      const totalCount = mockCreators.length

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify ilike was called for category search
      const mockIlike = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order.mock.results[0].value.order.mock.results[0].value.ilike
      expect(mockIlike).toHaveBeenCalledWith('category', `%${testCategory}%`)
    })

    it('should filter by description', async () => {
      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'description', value: 'creative', displayText: 'creative' }
        ] as SearchTag[]
      }

      // Use the existing page method and filter manually for testing
      const allCreators = testData.creators.page(0, 1000) // Get all creators
      const mockCreators = allCreators.filter(c => c.description.toLowerCase().includes('creative'))
      const totalCount = mockCreators.length

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify ilike was called for description search
      const mockIlike = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order.mock.results[0].value.order.mock.results[0].value.ilike
      expect(mockIlike).toHaveBeenCalledWith('description', '%creative%')
    })

    it('should handle multiple search tags (AND logic)', async () => {
      const testCategory = testData.categories.all()[0]
      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'category', value: testCategory, displayText: testCategory },
          { type: 'name', value: 'test', displayText: 'test' }
        ] as SearchTag[]
      }

      // Filter by both category and name
      const mockCreators = testData.creators
        .byCategory(testCategory)
        .filter(c => c.name.toLowerCase().includes('test'))
      const totalCount = mockCreators.length

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual(mockCreators)
      expect(result.current.totalCount).toBe(totalCount)

      // Verify multiple ilike calls were made
      const mockIlike = vi.mocked(supabase.from).mock.results[0].value.select.mock.results[0].value
        .range.mock.results[0].value.order.mock.results[0].value.order.mock.results[0].value.ilike
      expect(mockIlike).toHaveBeenCalledTimes(2)
      expect(mockIlike).toHaveBeenCalledWith('category', `%${testCategory}%`)
      expect(mockIlike).toHaveBeenCalledWith('name', '%test%')
    })

    it('should return empty results for impossible search', async () => {
      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'name', value: 'IMPOSSIBLE_SEARCH_TERM', displayText: 'impossible' }
        ] as SearchTag[]
      }

      vi.mocked(supabase.from).mockReturnValue(createMockChain([], 0) as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle Supabase errors gracefully', async () => {
      vi.mocked(supabase.from).mockReturnValue(createMockChain(null, 0, true) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe('Database error')
      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
    })

    it('should handle HTTP errors', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          range: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: null,
                count: null,
                error: null,
                status: 500,
                statusText: 'Internal Server Error'
              })
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe('HTTP 500: Internal Server Error')
      expect(result.current.creators).toEqual([])
    })

    it('should handle network errors', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          range: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockRejectedValue(new Error('Network error'))
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe('Network error')
      expect(result.current.creators).toEqual([])
    })

    it('should handle unknown error types', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          range: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockRejectedValue({ message: 'Unknown error' })
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe('Unknown error')
      expect(result.current.creators).toEqual([])
    })
  })

  describe('Refetch Functionality', () => {
    it('should refetch data when refetch is called', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const initialCount = result.current.totalCount
      expect(initialCount).toBeGreaterThan(0)

      // Clear mocks and set up new response
      vi.clearAllMocks()
      const newMockCreators = testData.creators.page(0, 15)
      vi.mocked(supabase.from).mockReturnValue(
        createMockChain(newMockCreators, initialCount) as any
      )

      // Call refetch
      await act(async () => {
        await result.current.refetch()
      })

      // Should have new data
      expect(result.current.creators).toEqual(newMockCreators)
      expect(result.current.totalCount).toBe(initialCount)
      expect(result.current.error).toBe(null)
    })

    it('should handle refetch errors', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Set up error response for refetch
      vi.mocked(supabase.from).mockReturnValue(createMockChain(null, 0, true) as any)

      // Call refetch
      await act(async () => {
        await result.current.refetch()
      })

      expect(result.current.error).toBe('Database error')
      expect(result.current.creators).toEqual([])
    })
  })

  describe('useEffect Dependencies', () => {
    it('should refetch when pagination changes', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result, rerender } = renderHook(props => useCreators(props), {
        initialProps: defaultParams
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(supabase.from).toHaveBeenCalledTimes(1)

      // Change pagination
      const newParams = {
        ...defaultParams,
        pagination: { pageIndex: 1, pageSize: 20 }
      }

      rerender(newParams)

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledTimes(2)
      })
    })

    it('should refetch when sorting changes', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result, rerender } = renderHook(props => useCreators(props), {
        initialProps: defaultParams
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(supabase.from).toHaveBeenCalledTimes(1)

      // Change sorting
      const newParams = {
        ...defaultParams,
        sorting: [{ id: 'name', desc: true }] as SortingState[]
      }

      rerender(newParams)

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledTimes(2)
      })
    })

    it('should refetch when searchTags change', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      vi.mocked(supabase.from).mockReturnValue(createMockChain(mockCreators, totalCount) as any)

      const { result, rerender } = renderHook(props => useCreators(props), {
        initialProps: defaultParams
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(supabase.from).toHaveBeenCalledTimes(1)

      // Change search tags
      const newParams = {
        ...defaultParams,
        searchTags: [{ type: 'name', value: 'test', displayText: 'test' }] as SearchTag[]
      }

      rerender(newParams)

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('Data Integrity', () => {
    it('should handle null or undefined data gracefully', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          range: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: null,
                count: undefined,
                error: null
              })
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)
    })

    it('should preserve totalCount on error for pagination consistency', async () => {
      const mockCreators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      // First successful call
      vi.mocked(supabase.from).mockReturnValueOnce(createMockChain(mockCreators, totalCount) as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.totalCount).toBe(totalCount)

      // Then error call
      vi.mocked(supabase.from).mockReturnValueOnce(createMockChain(null, 0, true) as any)

      await act(async () => {
        await result.current.refetch()
      })

      expect(result.current.error).toBe('Database error')
      expect(result.current.creators).toEqual([])
      // totalCount should be preserved for pagination
      expect(result.current.totalCount).toBe(totalCount)
    })
  })
})
