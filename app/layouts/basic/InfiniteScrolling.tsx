import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Masonry } from './Masonry'

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
  const [visibleItems, setVisibleItems] = useState<T[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>()
  const loadingTimeoutRef = useRef<NodeJS.Timeout>()

  // Initialize with first batch
  useEffect(() => {
    if (allItems.length > 0 && visibleItems.length === 0) {
      const initial = allItems.slice(0, initialCount)
      setVisibleItems(initial)
      setCurrentIndex(initialCount)
    }
  }, [allItems, visibleItems.length, initialCount])

  // Simplified load more function
  const loadMore = useCallback(() => {
    if (isLoading || currentIndex >= allItems.length) return

    setIsLoading(true)

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }

    // Add new items after a brief delay for smooth UX
    loadingTimeoutRef.current = setTimeout(() => {
      const nextBatch = allItems.slice(currentIndex, currentIndex + loadMoreCount)

      if (nextBatch.length > 0) {
        setVisibleItems(prev => [...prev, ...nextBatch])
        setCurrentIndex(prev => prev + loadMoreCount)
      }

      setIsLoading(false)
    }, 400)
  }, [allItems, currentIndex, isLoading, loadMoreCount])

  // Setup intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoading && currentIndex < allItems.length) {
          loadMore()
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    )

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [loadMore, isLoading, currentIndex, allItems.length])

  const hasMore = currentIndex < allItems.length

  return (
    <div>
      <Masonry
        items={visibleItems}
        renderItem={renderItem}
        itemWidth={itemWidth}
        gap={gap}
        className={className}
      />

      {/* Simple loading indicator */}
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

      {/* Intersection observer sentinel */}
      {hasMore && !isLoading && (
        <div ref={sentinelRef} className="flex justify-center items-center w-full h-10">
          {/* Invisible trigger area */}
        </div>
      )}

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
