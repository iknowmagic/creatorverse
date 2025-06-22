import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Creator } from '~/data/creators'

interface ReactWookmarkProps {
  creators: Creator[]
  renderCard: (creator: Creator, index: number) => React.ReactNode
  className?: string
  itemWidth?: number
  offset?: number
}

interface WookmarkItem {
  creator: Creator
  index: number
  height: number
  top: number
  left: number
}

interface WookmarkOptions {
  align: 'left' | 'center' | 'right'
  autoResize: boolean
  itemWidth: number
  offset: number
  outerOffset: number
  resizeDelay: number
}

export function ReactWookmark({
  creators,
  renderCard,
  className = '',
  itemWidth = 280,
  offset = 12
}: ReactWookmarkProps) {
  const [visibleItems, setVisibleItems] = useState<Creator[]>([])
  const [wookmarkItems, setWookmarkItems] = useState<WookmarkItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [layoutReady, setLayoutReady] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | undefined>(undefined)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Wookmark configuration - fixed item width approach
  const options: WookmarkOptions = {
    align: 'center',
    autoResize: true,
    itemWidth: itemWidth, // Configurable item width
    offset: offset, // Configurable gap
    outerOffset: 0,
    resizeDelay: 50
  }

  // Load more configuration
  const INITIAL_LOAD = 10
  const LOAD_MORE = 20

  // Get container inner width
  const getInnerWidth = useCallback(() => {
    if (!containerRef.current) return 800
    return containerRef.current.offsetWidth - 2 * options.outerOffset
  }, [options.outerOffset])

  // Calculate item width (Real Wookmark algorithm)
  const getItemWidth = useCallback(() => {
    const innerWidth = getInnerWidth()

    // Use fixed item width, but ensure it fits in container
    // If fixed width is too large, scale it down
    const maxItemWidth = innerWidth - options.offset
    return Math.min(options.itemWidth, maxItemWidth)
  }, [options.itemWidth, options.offset, getInnerWidth])

  // Get number of columns (Real Wookmark algorithm)
  const getColumnCount = useCallback(() => {
    const itemWidth = getItemWidth()
    const columnWidth = itemWidth + options.offset
    const innerWidth = getInnerWidth()

    // Core Wookmark calculation: how many columns fit?
    // Example: containerWidth=900px, itemWidth=280px, offset=12px
    // columnWidth = 280 + 12 = 292px
    // columns = floor((900 + 12) / 292) = floor(912 / 292) = 3 columns
    const columns = Math.floor((innerWidth + options.offset) / columnWidth)

    // Ensure at least 1 column, and don't exceed item count
    return Math.max(1, Math.min(columns, visibleItems.length))
  }, [getItemWidth, options.offset, getInnerWidth, visibleItems.length])

  // Main layout function (adapted from Wookmark's layoutFull)
  const performLayout = useCallback(
    (force = false) => {
      if (!containerRef.current || visibleItems.length === 0) return

      const calculatedItemWidth = getItemWidth()
      const columnWidth = calculatedItemWidth + options.offset
      const innerWidth = getInnerWidth()
      const columns = getColumnCount()

      // Calculate offset for alignment
      let offset = options.outerOffset
      if (options.align === 'center') {
        offset += Math.floor((innerWidth - (columns * columnWidth - options.offset)) / 2)
      }

      // Initialize column heights
      const heights = new Array(columns).fill(options.outerOffset)
      const newWookmarkItems: WookmarkItem[] = []

      // Process each visible item
      visibleItems.forEach((creator, index) => {
        const itemRef = itemRefs.current[index]
        let itemHeight = 200 // Default height

        if (itemRef) {
          itemHeight = itemRef.offsetHeight
        }

        // Find shortest column (core Wookmark algorithm)
        let shortestHeight = heights[0]
        let shortestIndex = 0
        for (let k = 0; k < columns; k++) {
          if (heights[k] < shortestHeight) {
            shortestHeight = heights[k]
            shortestIndex = k
          }
        }

        // Calculate position
        const top = shortestHeight
        const left = offset + shortestIndex * columnWidth

        // Store item data
        newWookmarkItems.push({
          creator,
          index,
          height: itemHeight,
          top,
          left
        })

        // Update column height
        heights[shortestIndex] += itemHeight + options.offset
      })

      setWookmarkItems(newWookmarkItems)
      setContainerHeight(Math.max(...heights))
      setLayoutReady(true)
    },
    [visibleItems, getItemWidth, getColumnCount, getInnerWidth, options]
  )

  // Delayed layout function for resize
  const onResize = useCallback(() => {
    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current)
    }
    resizeTimerRef.current = setTimeout(() => {
      performLayout(true)
    }, options.resizeDelay)
  }, [performLayout, options.resizeDelay])

  // Load more creators (from your existing system)
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    setTimeout(() => {
      const nextIndex = currentIndex + LOAD_MORE
      const newItems = creators.slice(currentIndex, nextIndex)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setVisibleItems(prev => [...prev, ...newItems])
        setCurrentIndex(nextIndex)

        if (nextIndex >= creators.length) {
          setHasMore(false)
        }
      }

      setIsLoading(false)
    }, 300)
  }, [creators, currentIndex, isLoading, hasMore])

  // Initial load
  useEffect(() => {
    if (creators.length > 0 && visibleItems.length === 0) {
      const initialItems = creators.slice(0, INITIAL_LOAD)
      setVisibleItems(initialItems)
      setCurrentIndex(INITIAL_LOAD)
      setHasMore(creators.length > INITIAL_LOAD)
    }
  }, [creators])

  // Perform layout when items change
  useEffect(() => {
    if (visibleItems.length > 0) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => performLayout(), 10)
      return () => clearTimeout(timer)
    }
  }, [visibleItems, performLayout])

  // Resize listener
  useEffect(() => {
    if (options.autoResize) {
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }
  }, [onResize, options.autoResize])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1
      }
    )

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, loadMore])

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1] as const
      }
    }
  }

  return (
    <div className={`react-wookmark ${className}`}>
      {/* Masonry Container */}
      <div ref={containerRef} className="relative" style={{ height: `${containerHeight}px` }}>
        <AnimatePresence>
          {wookmarkItems.map(item => (
            <motion.div
              key={item.creator.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: (item.index % LOAD_MORE) * 0.03,
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1] as const
              }}
              className="absolute"
              style={{
                left: `${item.left}px`,
                top: `${item.top}px`,
                width: `${getItemWidth()}px`
              }}
              ref={el => {
                itemRefs.current[item.index] = el
              }}
            >
              {renderCard(item.creator, item.index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 uppercase dark:text-gray-400">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
            Loading More Creators
          </div>
        </motion.div>
      )}

      {/* Intersection Observer Sentinel */}
      {hasMore && <div ref={sentinelRef} className="h-10" />}

      {/* End Message */}
      {!hasMore && visibleItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 mb-8 text-center"
        >
          <div className="inline-block border border-gray-400 px-4 py-2 text-sm text-gray-700 uppercase dark:border-gray-600 dark:text-gray-300">
            End of Gallery — {creators.length} Total Creators
          </div>
        </motion.div>
      )}
    </div>
  )
}
