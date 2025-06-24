import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface MasonryInfiniteScrollProps<T> {
  allItems: T[]
  renderItem: (item: T) => React.ReactNode
  itemWidth?: number
  gap?: number
  className?: string
  initialCount?: number
  loadMoreCount?: number
}

interface LayoutItem<T> {
  item: T
  id: string | number
  x: number
  y: number
  width: number
  height: number
}

export function MasonryInfiniteScroll<T extends { id: string | number }>({
  allItems,
  renderItem,
  itemWidth = 300,
  gap = 16,
  className = '',
  initialCount = 12,
  loadMoreCount = 18
}: MasonryInfiniteScrollProps<T>) {
  // Infinite scroll state
  const [visibleItems, setVisibleItems] = useState<T[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Masonry layout state
  const [layoutItems, setLayoutItems] = useState<LayoutItem<T>[]>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const measureElementsRef = useRef<Map<string | number, HTMLDivElement>>(new Map())
  const sentinelRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>()
  const isLoadingRef = useRef(false) // Prevent race conditions

  // Initialize with first batch
  useEffect(() => {
    if (allItems.length > 0 && visibleItems.length === 0) {
      console.log('🚀 Initializing with first batch:', initialCount)
      const initial = allItems.slice(0, initialCount)
      setVisibleItems(initial)
      setCurrentIndex(initialCount)
    }
  }, [allItems, initialCount])

  // Masonry layout calculation
  const calculateLayout = useCallback(() => {
    if (!containerRef.current || visibleItems.length === 0) return

    const containerWidth = containerRef.current.offsetWidth
    const columnWidth = itemWidth + gap
    const maxColumns = Math.floor((containerWidth + gap) / columnWidth)
    const columns = Math.max(1, Math.min(maxColumns, visibleItems.length))

    // Center the layout
    const totalLayoutWidth = columns * columnWidth - gap
    const leftOffset = Math.max(0, Math.floor((containerWidth - totalLayoutWidth) / 2))

    // Initialize column heights
    const columnHeights = new Array(columns).fill(0)
    const newLayoutItems: LayoutItem<T>[] = []

    // Process each item
    visibleItems.forEach(item => {
      const element = measureElementsRef.current.get(item.id)
      if (!element || element.offsetHeight === 0) return

      const itemHeight = element.offsetHeight

      // Find shortest column
      let minHeight = columnHeights[0]
      let minColumn = 0
      for (let i = 1; i < columns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i]
          minColumn = i
        }
      }

      // Calculate position
      const x = leftOffset + minColumn * columnWidth
      const y = minHeight

      newLayoutItems.push({
        item,
        id: item.id,
        x,
        y,
        width: itemWidth,
        height: itemHeight
      })

      // Update column height
      columnHeights[minColumn] = minHeight + itemHeight + gap
    })

    const finalHeight = Math.max(...columnHeights) - gap

    setLayoutItems(newLayoutItems)
    setContainerHeight(finalHeight)
    setIsLayoutReady(true)
    console.log('📐 Layout calculated:', { items: newLayoutItems.length, height: finalHeight })
  }, [visibleItems, itemWidth, gap])

  // Measure and layout when items change
  const measureAndLayout = useCallback(() => {
    const allMeasured = visibleItems.every(item => {
      const element = measureElementsRef.current.get(item.id)
      return element && element.offsetHeight > 0
    })

    if (allMeasured) {
      calculateLayout()
    } else {
      setTimeout(measureAndLayout, 50)
    }
  }, [visibleItems, calculateLayout])

  // Trigger layout when visible items change
  useEffect(() => {
    if (visibleItems.length > 0) {
      setIsLayoutReady(false)
      setTimeout(measureAndLayout, 100)
    }
  }, [visibleItems.length, measureAndLayout])

  // Load more function - NO setTimeout, direct execution
  const loadMore = useCallback(() => {
    console.log('📞 loadMore called:', {
      isLoading: isLoadingRef.current,
      currentIndex,
      totalItems: allItems.length,
      visibleItems: visibleItems.length
    })

    // Use ref to prevent race conditions
    if (isLoadingRef.current || currentIndex >= allItems.length) {
      console.log('❌ Load blocked')
      return
    }

    console.log('✅ Loading more items immediately...')
    isLoadingRef.current = true
    setIsLoading(true)

    // Execute immediately - no setTimeout!
    const nextBatch = allItems.slice(currentIndex, currentIndex + loadMoreCount)
    console.log('📦 Next batch:', {
      from: currentIndex,
      to: currentIndex + loadMoreCount,
      size: nextBatch.length
    })

    if (nextBatch.length > 0) {
      // Update state immediately
      setVisibleItems(prev => {
        const newItems = [...prev, ...nextBatch]
        console.log('📊 Updated visibleItems:', prev.length, '→', newItems.length)
        return newItems
      })

      setCurrentIndex(prev => {
        const newIndex = prev + loadMoreCount
        console.log('📍 Updated currentIndex:', prev, '→', newIndex)
        return newIndex
      })
    }

    // Short delay just for UI smoothness, then reset loading
    setTimeout(() => {
      isLoadingRef.current = false
      setIsLoading(false)
      console.log('✅ Loading complete')
    }, 300)
  }, [allItems, currentIndex, loadMoreCount])

  // Setup intersection observer - MUCH simpler!
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!sentinelRef.current) return

    console.log('👁️ Setting up intersection observer')

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries
        console.log('👀 Intersection observed:', {
          isIntersecting: entry.isIntersecting,
          isLoading: isLoadingRef.current,
          hasMore: currentIndex < allItems.length
        })

        if (entry.isIntersecting && !isLoadingRef.current && currentIndex < allItems.length) {
          console.log('🎯 Triggering loadMore from intersection')
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

  // Handle resize
  const handleResize = useCallback(() => {
    if (isLayoutReady) {
      measureAndLayout()
    }
  }, [isLayoutReady, measureAndLayout])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const hasMore = currentIndex < allItems.length

  return (
    <div className={className}>
      {/* Main masonry container */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          height: isLayoutReady ? `${containerHeight}px` : 'auto',
          minHeight: '200px'
        }}
      >
        {/* Positioned items (when layout is ready) */}
        {isLayoutReady && (
          <AnimatePresence>
            {layoutItems.map((layoutItem, index) => (
              <motion.div
                key={layoutItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.01,
                  duration: 0.2,
                  ease: [0.25, 0.25, 0, 1]
                }}
                className="absolute"
                style={{
                  left: `${layoutItem.x}px`,
                  top: `${layoutItem.y}px`,
                  width: `${layoutItem.width}px`
                }}
              >
                {renderItem(layoutItem.item)}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Measurement items (hidden when layout ready) */}
        <div
          className={isLayoutReady ? 'opacity-0 pointer-events-none' : 'space-y-4'}
          style={{ width: `${itemWidth}px` }}
        >
          {visibleItems.map(item => (
            <div
              key={`measure-${item.id}`}
              style={{ width: `${itemWidth}px` }}
              ref={el => {
                if (el) {
                  measureElementsRef.current.set(item.id, el)
                } else {
                  measureElementsRef.current.delete(item.id)
                }
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Intersection Observer Sentinel - OUTSIDE masonry container */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center bg-yellow-100 border border-yellow-300 w-full h-4 text-yellow-800 text-xs text-center"
        >
          SCROLL TRIGGER (visible for debugging)
        </div>
      )}

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

      {/* Manual trigger for debugging */}
      {hasMore && !isLoading && (
        <div className="py-4 text-center">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
          >
            🔧 Manual Load More
          </button>
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
