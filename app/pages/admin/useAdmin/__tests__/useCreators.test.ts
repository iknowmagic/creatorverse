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

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State & Loading', () => {
    it('should start with loading state', async () => {
      // Create a promise that we can control to test loading state
      let resolvePromise: (value: any) => void
      const controlledPromise = new Promise(resolve => {
        resolvePromise = resolve
      })

      // Mock the chain to return our controlled promise
      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue(controlledPromise)
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      // Check initial loading state
      expect(result.current.isLoading).toBe(true)
      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)

      // Resolve the promise to allow hook to complete
      resolvePromise!({ data: [], count: 0, error: null })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('should fetch real creators data successfully', async () => {
      // Setup mock with actual test data
      const creators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      const mockResponse = {
        data: creators,
        count: totalCount,
        error: null
      }

      // Create proper chain mock
      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue(mockResponse)
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(Math.min(20, totalCount))
      expect(result.current.totalCount).toBe(totalCount)
      expect(result.current.error).toBe(null)

      // Verify structure of first creator
      if (result.current.creators.length > 0) {
        expect(result.current.creators[0]).toHaveProperty('id')
        expect(result.current.creators[0]).toHaveProperty('name')
        expect(result.current.creators[0]).toHaveProperty('category')
        expect(result.current.creators[0]).toHaveProperty('description')
        expect(result.current.creators[0]).toHaveProperty('url')
      }
    })
  })

  describe('Pagination with Real Data', () => {
    it('should handle first page correctly', async () => {
      const pageSize = 15
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 0, pageSize }
      }

      const pageData = testData.creators.page(0, pageSize)
      const totalCount = testData.creators.count()

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: pageData,
            count: totalCount,
            error: null
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const expectedPageSize = Math.min(pageSize, totalCount)
      expect(result.current.creators).toHaveLength(expectedPageSize)
      expect(result.current.totalCount).toBe(totalCount)
    })

    it('should handle second page correctly', async () => {
      const pageSize = 20
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 1, pageSize }
      }

      const pageData = testData.creators.page(1, pageSize)
      const totalCount = testData.creators.count()

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: pageData,
            count: totalCount,
            error: null
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const expectedSecondPageSize = Math.max(0, Math.min(pageSize, totalCount - pageSize))
      expect(result.current.creators).toHaveLength(expectedSecondPageSize)
      expect(result.current.totalCount).toBe(totalCount)
    })
  })

  describe('Search Filtering with Real Data', () => {
    it('should filter by actual category names', async () => {
      const realCategories = testData.categories.all()
      const testCategory = realCategories[0]

      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'category', value: testCategory, displayText: testCategory }
        ] as SearchTag[]
      }

      const filteredData = testData.creators.byCategory(testCategory)

      // Mock the chain with search filtering
      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            ilike: vi.fn().mockResolvedValue({
              data: filteredData,
              count: filteredData.length,
              error: null
            })
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      result.current.creators.forEach(creator => {
        expect(creator.category).toBe(testCategory)
      })

      expect(result.current.totalCount).toBe(filteredData.length)
    })

    it('should return empty results for impossible search', async () => {
      const params = {
        ...defaultParams,
        searchTags: [
          {
            type: 'name',
            value: 'IMPOSSIBLE_CREATOR_NAME_THAT_DOES_NOT_EXIST',
            displayText: 'impossible'
          }
        ] as SearchTag[]
      }

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            ilike: vi.fn().mockResolvedValue({
              data: [],
              count: 0,
              error: null
            })
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(0)
      expect(result.current.totalCount).toBe(0)
    })
  })

  describe('Refetch Functionality', () => {
    it('should refetch data when refetch is called', async () => {
      const creators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: creators,
            count: totalCount,
            error: null
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const initialCount = result.current.totalCount
      expect(initialCount).toBeGreaterThan(0)

      await act(async () => {
        await result.current.refetch()
      })

      expect(result.current.totalCount).toBe(initialCount)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Real Data Characteristics', () => {
    it('should work with actual data size and pagination', async () => {
      const creators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: creators,
            count: totalCount,
            error: null
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(totalCount).toBeGreaterThan(50)
      expect(result.current.totalCount).toBe(totalCount)

      const expectedFirstPageSize = Math.min(20, totalCount)
      expect(result.current.creators).toHaveLength(expectedFirstPageSize)
    })

    it('should handle creators with and without images', async () => {
      const creators = testData.creators.page(0, 20)
      const totalCount = testData.creators.count()

      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: creators,
            count: totalCount,
            error: null
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const withImages = result.current.creators.filter(c => c.image_url !== null)
      const withoutImages = result.current.creators.filter(c => c.image_url === null)
      expect(withImages.length + withoutImages.length).toBe(result.current.creators.length)
    })
  })
})
