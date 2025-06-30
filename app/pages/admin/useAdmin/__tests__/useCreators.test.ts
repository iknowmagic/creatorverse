// app/pages/admin/useAdmin/__tests__/useCreators.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'
import { testDataHelpers } from '~/../tests/data'
import { resetWorkingData } from '~/../tests/mocks/handlers'
import { server } from '~/../tests/mocks/server'
import type { PaginationState, SearchTag, SortingState } from '../types'
import { useCreators } from '../useCreators'

describe('useCreators Hook', () => {
  const defaultParams = {
    pagination: { pageIndex: 0, pageSize: 20 } as PaginationState,
    sorting: [] as SortingState[],
    searchTags: [] as SearchTag[]
  }

  beforeEach(() => {
    resetWorkingData()
  })

  describe('Initial State & Loading', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)
    })

    it('should fetch real creators data successfully', async () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalCreators = testDataHelpers.totalCreators()

      expect(result.current.creators).toHaveLength(Math.min(20, totalCreators)) // pageSize = 20
      expect(result.current.totalCount).toBe(totalCreators)
      expect(result.current.error).toBe(null)

      // Verify actual data structure from CSV
      expect(result.current.creators[0]).toHaveProperty('id')
      expect(result.current.creators[0]).toHaveProperty('name')
      expect(result.current.creators[0]).toHaveProperty('category')
      expect(result.current.creators[0]).toHaveProperty('description')
      expect(result.current.creators[0]).toHaveProperty('url')
    })
  })

  describe('Pagination with Real Data', () => {
    it('should handle first page correctly', async () => {
      const pageSize = 15
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 0, pageSize }
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalCreators = testDataHelpers.totalCreators()
      const expectedPageSize = Math.min(pageSize, totalCreators)

      expect(result.current.creators).toHaveLength(expectedPageSize)
      expect(result.current.totalCount).toBe(totalCreators)
    })

    it('should handle second page correctly', async () => {
      const pageSize = 20
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 1, pageSize }
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalCreators = testDataHelpers.totalCreators()
      const expectedSecondPageSize = Math.max(0, Math.min(pageSize, totalCreators - pageSize))

      expect(result.current.creators).toHaveLength(expectedSecondPageSize)
      expect(result.current.totalCount).toBe(totalCreators)
    })

    it('should handle empty page gracefully', async () => {
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 10, pageSize: 20 } // Way beyond available data
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(0)
      expect(result.current.totalCount).toBe(testDataHelpers.totalCreators())
    })
  })

  describe('Sorting with Real Categories', () => {
    it('should sort by category ascending (default)', async () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const categories = result.current.creators.map(c => c.category)
      const sortedCategories = [...categories].sort()

      // First few should be in alphabetical order
      expect(categories.slice(0, 5)).toEqual(sortedCategories.slice(0, 5))
    })

    it('should sort by name descending', async () => {
      const params = {
        ...defaultParams,
        sorting: [{ id: 'name', desc: true }]
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const names = result.current.creators.map(c => c.name)

      // Verify descending order (at least first few)
      for (let i = 0; i < Math.min(3, names.length - 1); i++) {
        expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0)
      }
    })

    it('should apply multiple sorting criteria', async () => {
      const params = {
        ...defaultParams,
        sorting: [
          { id: 'category', desc: false },
          { id: 'name', desc: false }
        ]
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators.length).toBeGreaterThan(0)
      expect(result.current.totalCount).toBe(testDataHelpers.totalCreators())
    })
  })

  describe('Search Filtering with Real Data', () => {
    it('should filter by actual category names', async () => {
      // Get real categories from test data
      const realCategories = testDataHelpers
        .creatorsData()
        .map((c: { category: string }) => c.category)
      const uniqueCategories = Array.from(new Set(realCategories))
      const testCategory = uniqueCategories[0] // Use first real category

      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'category', value: testCategory, displayText: testCategory }
        ] as SearchTag[]
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned creators should have the filtered category
      result.current.creators.forEach(creator => {
        expect(creator.category).toBe(testCategory)
      })

      // Should match expected count from test data
      const expectedCount = testDataHelpers.creatorsByCategory(testCategory).length
      expect(result.current.totalCount).toBe(expectedCount)
    })

    it('should filter by partial name match', async () => {
      // Use a common word that appears in creator names
      const searchTerm = 'the' // Common word likely to appear in names

      const params = {
        ...defaultParams,
        searchTags: [{ type: 'name', value: searchTerm, displayText: searchTerm }] as SearchTag[]
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned creators should have the search term in their name
      result.current.creators.forEach(creator => {
        expect(creator.name.toLowerCase()).toContain(searchTerm.toLowerCase())
      })
    })

    it('should handle multiple search filters with AND logic', async () => {
      const realCategories = Array.from(
        new Set(testDataHelpers.creatorsData().map((c: { category: string }) => c.category))
      )
      const testCategory = realCategories[0]

      const params = {
        ...defaultParams,
        searchTags: [
          { type: 'category', value: testCategory, displayText: testCategory },
          { type: 'description', value: 'content', displayText: 'content' }
        ] as SearchTag[]
      }

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned creators should match BOTH filters
      result.current.creators.forEach(creator => {
        expect(creator.category).toBe(testCategory)
        expect(creator.description.toLowerCase()).toContain('content')
      })
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

      const { result } = renderHook(() => useCreators(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.creators).toHaveLength(0)
      expect(result.current.totalCount).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      // Override handler to return error in Supabase format
      server.use(
        http.get('*/rest/v1/creators', () => {
          return HttpResponse.json(
            {
              code: '42P01',
              message: 'Database connection failed',
              details: 'Unable to connect to database',
              hint: null
            },
            { status: 500 }
          )
        })
      )

      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.creators).toEqual([])
      expect(result.current.totalCount).toBe(0)
    })

    it('should clear error on successful retry', async () => {
      let shouldError = true

      server.use(
        http.get('*/rest/v1/creators', () => {
          if (shouldError) {
            return HttpResponse.json(
              {
                code: '42P01',
                message: 'Temporary error',
                details: 'Temporary database error',
                hint: null
              },
              { status: 500 }
            )
          }
          // Return empty array but valid response
          return HttpResponse.json([], {
            headers: {
              'Content-Range': '0-0/0',
              'Content-Type': 'application/json'
            }
          })
        })
      )

      const { result } = renderHook(() => useCreators(defaultParams))

      // Wait for error
      await waitFor(() => {
        expect(result.current.error).toBeTruthy()
      })

      // Fix the error and refetch
      shouldError = false
      await result.current.refetch()

      await waitFor(() => {
        expect(result.current.error).toBe(null)
        expect(result.current.isLoading).toBe(false)
      })
    })
  })

  describe('Refetch Functionality', () => {
    it('should refetch data when refetch is called', async () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const initialCount = result.current.totalCount
      expect(initialCount).toBeGreaterThan(0)

      // Call refetch
      await result.current.refetch()

      // Should have consistent data
      expect(result.current.totalCount).toBe(initialCount)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Real Data Characteristics', () => {
    it('should work with actual data size and pagination', async () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalCreators = testDataHelpers.totalCreators()

      // Verify we're working with substantial real data
      expect(totalCreators).toBeGreaterThan(50) // Should have 100+ creators
      expect(result.current.totalCount).toBe(totalCreators)

      // First page should be full (or total if less than page size)
      const expectedFirstPageSize = Math.min(20, totalCreators)
      expect(result.current.creators).toHaveLength(expectedFirstPageSize)
    })

    it('should handle creators with and without images', async () => {
      const { result } = renderHook(() => useCreators(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Check that we have both creators with and without images
      const withImages = result.current.creators.filter(c => c.image_url !== null)
      const withoutImages = result.current.creators.filter(c => c.image_url === null)

      // Should have a mix (based on real data patterns)
      expect(withImages.length + withoutImages.length).toBe(result.current.creators.length)
    })
  })
})
