import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface MasonryProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  itemWidth?: number
  gap?: number
  className?: string
}

interface WookmarkOptions {
  align: 'left' | 'center' | 'right'
  autoResize: boolean
  itemWidth: number
  offset: number
  outerOffset: number
  resizeDelay: number
  verticalOffset: number
}

interface LayoutItem<T> {
  item: T
  id: string | number
  x: number
  y: number
  width: number
  height: number
}

export function Masonry<T extends { id: string | number }>({
  items,
  renderItem,
  itemWidth = 300,
  gap = 16,
  className = ''
}: MasonryProps<T>) {
  const [layoutItems, setLayoutItems] = useState<LayoutItem<T>[]>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [itemHeights, setItemHeights] = useState<Map<string | number, number>>(new Map())

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map())
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()
  const initTimeoutRef = useRef<NodeJS.Timeout>()

  // Wookmark options (following original exactly)
  const options: WookmarkOptions = {
    align: 'center',
    autoResize: true,
    itemWidth: itemWidth,
    offset: gap,
    outerOffset: 0,
    resizeDelay: 50,
    verticalOffset: gap // Wookmark uses verticalOffset, falls back to offset
  }

  // Get container width (following original getWidth)
  const getContainerWidth = useCallback(() => {
    if (!containerRef.current) return 800
    return containerRef.current.offsetWidth
  }, [])

  // Calculate item width (following original getItemWidth)
  const getItemWidth = useCallback(() => {
    const containerWidth = getContainerWidth()
    const innerWidth = containerWidth - 2 * options.outerOffset

    // Use provided itemWidth, but don't exceed available space
    const maxItemWidth = innerWidth - options.offset
    return Math.min(options.itemWidth, maxItemWidth)
  }, [options, getContainerWidth])

  // Cache item heights (following original pattern)
  const cacheItemHeights = useCallback(() => {
    const newHeights = new Map<string | number, number>()
    let allMeasured = true

    items.forEach(item => {
      const element = itemRefs.current.get(item.id)
      if (element && element.offsetHeight > 0) {
        newHeights.set(item.id, element.offsetHeight)
      } else {
        allMeasured = false
      }
    })

    if (allMeasured && newHeights.size === items.length) {
      setItemHeights(newHeights)
      return true
    }
    return false
  }, [items])

  // Main layout function (following original layoutFull exactly)
  const layoutFull = useCallback(() => {
    if (!containerRef.current || items.length === 0 || itemHeights.size === 0) return

    const containerWidth = getContainerWidth()
    const calculatedItemWidth = getItemWidth()
    const columnWidth = calculatedItemWidth + options.offset
    const innerWidth = containerWidth - 2 * options.outerOffset

    // Calculate columns (original algorithm)
    const maxColumns = Math.floor((innerWidth + options.offset) / columnWidth)
    const columns = Math.max(1, Math.min(maxColumns, items.length))

    // Calculate offset for alignment (original algorithm)
    let offset = options.outerOffset
    if (options.align === 'center') {
      offset += Math.floor((innerWidth - (columns * columnWidth - options.offset)) / 2)
    }

    // Initialize column heights (original algorithm - starts with outerOffset)
    const heights: number[] = []
    const columnItems: T[][] = []
    while (heights.length < columns) {
      heights.push(options.outerOffset)
      columnItems.push([])
    }

    const newLayoutItems: LayoutItem<T>[] = []

    // Process each item (original layoutFull algorithm)
    let i = 0
    while (i < items.length) {
      const item = items[i]
      const itemHeight = itemHeights.get(item.id) || 250

      // Find shortest column (original algorithm)
      let shortest = heights[0]
      let shortestIndex = 0
      for (let k = 0; k < columns; k++) {
        if (heights[k] < shortest) {
          shortest = heights[k]
          shortestIndex = k
        }
      }

      // Calculate position (original algorithm)
      const top = shortest
      let sideOffset = offset

      // Original positioning logic
      if (shortestIndex > 0 || options.align !== 'left') {
        sideOffset += shortestIndex * columnWidth
      }

      // Store layout data
      newLayoutItems.push({
        item,
        id: item.id,
        x: sideOffset,
        y: top,
        width: calculatedItemWidth,
        height: itemHeight
      })

      // Update column height (original algorithm)
      heights[shortestIndex] += itemHeight + options.verticalOffset
      columnItems[shortestIndex].push(item)
      i++
    }

    // Set final container height (original algorithm)
    const maxHeight = Math.max(...heights)

    setLayoutItems(newLayoutItems)
    setContainerHeight(maxHeight)
    setIsInitialized(true)

    console.log('Layout complete:', {
      items: items.length,
      columns,
      containerWidth,
      calculatedItemWidth,
      maxHeight,
      heights
    })
  }, [items, itemHeights, getContainerWidth, getItemWidth, options])

  // Initialize layout when items and heights are ready
  useEffect(() => {
    if (items.length > 0) {
      // Clear previous timeout
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current)
      }

      setIsInitialized(false)

      // Give time for DOM to render
      initTimeoutRef.current = setTimeout(() => {
        if (cacheItemHeights()) {
          layoutFull()
        } else {
          // Retry if heights not ready
          setTimeout(() => {
            if (cacheItemHeights()) {
              layoutFull()
            }
          }, 100)
        }
      }, 50)
    }

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current)
      }
    }
  }, [items, cacheItemHeights, layoutFull])

  // Re-layout when heights change
  useEffect(() => {
    if (itemHeights.size === items.length && items.length > 0) {
      layoutFull()
    }
  }, [itemHeights, items.length, layoutFull])

  // Handle resize (original algorithm)
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (cacheItemHeights()) {
        layoutFull()
      }
    }, options.resizeDelay)
  }, [cacheItemHeights, layoutFull, options.resizeDelay])

  // Setup resize listener
  useEffect(() => {
    if (options.autoResize) {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }
      }
    }
  }, [handleResize, options.autoResize])

  // Ref callback for items
  const setItemRef = useCallback((element: HTMLDivElement | null, itemId: string | number) => {
    if (element) {
      itemRefs.current.set(itemId, element)
    } else {
      itemRefs.current.delete(itemId)
    }
  }, [])

  return (
    <div className={`masonry ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          height: isInitialized ? `${containerHeight}px` : 'auto',
          minHeight: isInitialized ? `${containerHeight}px` : '200px'
        }}
      >
        {/* Absolutely positioned items (only when layout is ready) */}
        {isInitialized && (
          <AnimatePresence>
            {layoutItems.map((layoutItem, index) => (
              <motion.div
                key={layoutItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.02,
                  duration: 0.3,
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

        {/* Items for measurement (always rendered, hidden when layout ready) */}
        <div
          className={isInitialized ? 'opacity-0 pointer-events-none absolute' : 'invisible'}
          style={{ width: `${getItemWidth()}px` }}
        >
          {items.map(item => (
            <div
              key={`measure-${item.id}`}
              style={{
                width: `${getItemWidth()}px`,
                marginBottom: `${gap}px`
              }}
              ref={el => setItemRef(el, item.id)}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple infinite scrolling wrapper
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

    setTimeout(() => {
      const nextBatch = allItems.slice(currentIndex, currentIndex + loadMoreCount)
      setVisibleItems(prev => [...prev, ...nextBatch])
      setCurrentIndex(prev => prev + loadMoreCount)
      setIsLoading(false)
    }, 300)
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
      { rootMargin: '200px' }
    )

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
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

      {hasMore && <div ref={sentinelRef} className="w-full h-10" />}

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="text-gray-500 text-sm">Loading more...</div>
        </div>
      )}

      {!hasMore && visibleItems.length > 0 && (
        <div className="py-8 text-center">
          <div className="text-gray-500 text-sm">All {allItems.length} items loaded</div>
        </div>
      )}
    </div>
  )
}
