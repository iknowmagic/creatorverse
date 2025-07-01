import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createSupabaseMock, mockResponses } from '~/../tests/mocks/supabase'

// Mock Supabase
vi.mock('~/lib/client', () => createSupabaseMock())

import { supabase } from '~/lib/client'
import { useSearchSuggestions } from '../useSearch'

describe('useSearchSuggestions Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default RPC mock
    vi.mocked(supabase.rpc).mockResolvedValue({
      data: mockResponses.search('test'),
      error: null
    })
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
