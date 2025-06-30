// app/pages/admin/useAdmin/__tests__/useSearch.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { resetWorkingData } from '~/../tests/mocks/handlers'
import { useSearchSuggestions } from '../useSearch'

describe('useSearchSuggestions Hook', () => {
  beforeEach(() => {
    resetWorkingData()
  })

  describe('Basic Functionality', () => {
    it('should start with empty suggestions', () => {
      const { result } = renderHook(() => useSearchSuggestions(''))

      expect(result.current.suggestions).toEqual([])
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should not search for short terms', () => {
      const { result } = renderHook(() => useSearchSuggestions('a'))

      expect(result.current.suggestions).toEqual([])
      expect(result.current.isLoading).toBe(false)
    })

    it('should search for valid terms', async () => {
      const { result } = renderHook(() => useSearchSuggestions('tech'))

      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(false)
        },
        { timeout: 1000 }
      )

      expect(result.current.error).toBe(null)
    })

    it('should handle existing tags without infinite loop', async () => {
      const existingTags = [
        { type: 'category' as const, value: 'Technology', displayText: 'Technology' }
      ]

      const { result } = renderHook(() => useSearchSuggestions('test', existingTags))

      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(false)
        },
        { timeout: 1000 }
      )

      expect(result.current.error).toBe(null)
    })
  })
})
