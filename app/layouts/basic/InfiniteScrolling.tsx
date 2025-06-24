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

  const masonryContainerRef = useRef<HTMLDivElement>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Initialize with first batch
  useEffect(() => {
    if (allItems.length > 0 && visibleItems.length === 0) {
      const initial = allItems.slice(0, initialCount)
      setVisibleItems(initial)
      setCurrentIndex(initialCount)
    }
  }, [allItems, visibleItems.length, initialCount])

  // Load more function
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

  // Custom scroll handler that works with Masonry's absolute positioning
  const handleScroll = useCallback(() => {
    if (!masonryContainerRef.current || ticking.current) return

    ticking.current = true

    requestAnimationFrame(() => {
      const container = masonryContainerRef.current
      if (!container) {
        ticking.current = false
        return
      }

      // Get the container's bounding rect
      const containerRect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate how much of the container is visible
      const visibleBottom = Math.min(containerRect.bottom, viewportHeight)
      const visibleTop = Math.max(containerRect.top, 0)
      const visibleHeight = visibleBottom - visibleTop

      // Trigger loading when we're near the bottom of the visible content
      // This accounts for the fixed height container with absolute positioned items
      const scrollProgress = (viewportHeight - containerRect.top) / containerHeight
      const shouldLoad = scrollProgress > 0.7 && !isLoading && currentIndex < allItems.length

      if (shouldLoad) {
        loadMore()
      }

      ticking.current = false
    })
  }, [loadMore, isLoading, currentIndex, allItems.length])

  // Set up scroll listener
  useEffect(() => {
    const throttledScroll = () => {
      lastScrollY.current = window.scrollY
      handleScroll()
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    window.addEventListener('resize', throttledScroll)

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', throttledScroll)
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [handleScroll])

  const hasMore = currentIndex < allItems.length

  return (
    <div>
      {/* Modified Masonry with ref for scroll detection */}
      <div ref={masonryContainerRef}>
        <Masonry
          items={visibleItems}
          renderItem={renderItem}
          itemWidth={itemWidth}
          gap={gap}
          className={className}
        />
      </div>

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
