import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchSuggestions, type SearchSuggestion } from './useCreators'

interface SearchTag {
  type: 'name' | 'description' | 'category'
  value: string
  displayText: string
}

interface SearchAutocompleteProps {
  onTagsChange: (tags: SearchTag[]) => void
  className?: string
}

export function SearchAutocomplete({ onTagsChange, className = '' }: SearchAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<SearchTag[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { suggestions, isLoading } = useSearchSuggestions(searchTerm, selectedTags)

  // Notify parent when tags change
  useEffect(() => {
    onTagsChange(selectedTags)
  }, [selectedTags, onTagsChange])

  // Show dropdown when we have suggestions
  useEffect(() => {
    setShowDropdown(suggestions.length > 0 && searchTerm.length >= 2)
  }, [suggestions, searchTerm])

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    const newTag: SearchTag = {
      type: suggestion.source_type,
      value: suggestion.match_words, // ✅ Use match_words
      displayText: suggestion.match_words // ✅ Use match_words for display too
    }

    // Don't add duplicate tags
    const isDuplicate = selectedTags.some(
      tag => tag.type === newTag.type && tag.value === newTag.value
    )

    if (!isDuplicate) {
      setSelectedTags(prev => [...prev, newTag])
    }

    // Clear search and close dropdown
    setSearchTerm('')
    setShowDropdown(false)
    setFocusedIndex(-1)
    inputRef.current?.focus()
  }

  // Remove tag
  const removeTag = (index: number) => {
    setSelectedTags(prev => prev.filter((_, i) => i !== index))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && suggestions[focusedIndex]) {
          handleSuggestionSelect(suggestions[focusedIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setFocusedIndex(-1)
        break
    }
  }

  // Get tag styling based on type
  const getTagStyling = (type: SearchTag['type']) => {
    switch (type) {
      case 'name':
        return 'bg-gray-900 text-white border-gray-900'
      case 'category':
        return 'bg-gray-600 text-white border-gray-600'
      case 'description':
        return 'bg-gray-400 text-gray-900 border-gray-400'
      default:
        return 'bg-gray-500 text-white border-gray-500'
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Input with Tags */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus-within:border-gray-600 dark:border-gray-600 dark:focus-within:border-gray-400 min-h-[44px]">
        {/* Selected Tags */}
        {selectedTags.map((tag, index) => (
          <motion.div
            key={`${tag.type}-${tag.value}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`flex items-center gap-1 px-2 py-1 border-2 text-xs font-chivo uppercase tracking-wide ${getTagStyling(tag.type)}`}
          >
            <span>{tag.displayText}</span>
            <button
              onClick={() => removeTag(index)}
              className="hover:bg-black/20 p-0.5 transition-colors"
              title="Remove filter"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}

        {/* Search Input */}
        <div className="flex flex-1 items-center gap-2 min-w-[200px]">
          <Search size={16} className="text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search creators, categories, or descriptions..."
            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 text-sm"
          />
          {isLoading && (
            <div className="border-2 border-gray-500 border-t-transparent rounded-full w-4 h-4 animate-spin" />
          )}
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="top-full left-0 z-50 absolute bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-600 border-t-0 w-full max-h-64 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.source_type}-${suggestion.match_words}`}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-300 dark:border-gray-500 transition-colors ${
                  index === focusedIndex ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: suggestion.highlighted_text }}
                    />
                    <div className="text-gray-500 dark:text-gray-400 text-xs tracking-wide">
                      In {suggestion.source_type}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
