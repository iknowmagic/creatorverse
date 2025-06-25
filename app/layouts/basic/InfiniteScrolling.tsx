import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Masonry, type MasonryRef } from './Masonry'

interface InfiniteScrollingProps<T> {
  allItems: T[]
  renderItem: (item: T) => React.ReactNode
  itemWidth?: number
  gap?: number
  className?: string
  initialCount?: number
  loadMoreCount?: number
}

export function InfiniteScrolling<T extends { id: string | number }>({
  allItems,
  renderItem,
  itemWidth = 300,
  gap = 16,
  className = '',
  initialCount = 12,
  loadMoreCount = 18
}: InfiniteScrollingProps<T>) {
  // Infinite scroll state
  const [visibleItems, setVisibleItems] = useState<T[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Refs for coordination
  const masonryRef = useRef<MasonryRef>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isLoadingRef = useRef(false)
  const actionTriggered = useRef(false) // Prevent multiple triggers

  // Initialize with first batch
  useEffect(() => {
    if (allItems.length > 0) {
      const initial = allItems.slice(0, initialCount)
      setVisibleItems(initial)
      setCurrentIndex(initialCount)
    } else {
      setVisibleItems([])
      setCurrentIndex(0)
    }
  }, [allItems, initialCount])

  // Load more function - patterns from react-infinite-scroll-component
  const loadMore = useCallback(() => {
    // Prevent multiple triggers
    if (isLoadingRef.current || currentIndex >= allItems.length) {
      return
    }

    isLoadingRef.current = true
    setIsLoading(true)

    // Execute immediately - no setTimeout!
    const nextBatch = allItems.slice(currentIndex, currentIndex + loadMoreCount)

    if (nextBatch.length > 0) {
      // Update state immediately
      setVisibleItems(prev => [...prev, ...nextBatch])
      setCurrentIndex(prev => prev + loadMoreCount)
    }

    // Short delay for UI smoothness
    setTimeout(() => {
      isLoadingRef.current = false
      setIsLoading(false)
    }, 200)
  }, [allItems, currentIndex, loadMoreCount])

  // Reset action trigger when new items are loaded
  useEffect(() => {
    actionTriggered.current = false
  }, [visibleItems.length])

  // Setup intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!sentinelRef.current) return

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries

        // Prevent multiple triggers (borrowed from react-infinite-scroll-component)
        if (actionTriggered.current) {
          return
        }

        if (entry.isIntersecting && !isLoadingRef.current && currentIndex < allItems.length) {
          actionTriggered.current = true
          loadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1
      }
    )

    observerRef.current.observe(sentinelRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMore, currentIndex, allItems.length])

  const hasMore = currentIndex < allItems.length

  // Handle layout completion from Masonry
  const handleLayoutComplete = useCallback((height: number) => {
    // Layout is complete, could trigger additional logic here if needed
  }, [])

  return (
    <div>
      {/* Masonry component with visible items */}
      <Masonry
        ref={masonryRef}
        items={visibleItems}
        renderItem={renderItem}
        itemWidth={itemWidth}
        gap={gap}
        className={className}
        onLayoutComplete={handleLayoutComplete}
      />

      {/* Intersection Observer Sentinel - outside masonry container */}
      {hasMore && <div ref={sentinelRef} className="w-full h-4" style={{ visibility: 'hidden' }} />}

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center py-6"
          >
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
              <motion.div
                className="bg-gray-500 rounded-full w-3 h-3"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className="text-gray-600 dark:text-gray-300 text-sm">Loading more...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion message */}
      {!hasMore && visibleItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="bg-green-500 rounded-full w-2 h-2"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              All {allItems.length} items loaded
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
