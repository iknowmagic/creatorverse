import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface MasonryProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  itemWidth?: number
  gap?: number
  className?: string
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
  const [isReady, setIsReady] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const measureElementsRef = useRef<Map<string | number, HTMLDivElement>>(new Map())

  // Simple layout calculation
  const calculateLayout = useCallback(() => {
    if (!containerRef.current || items.length === 0) return

    const containerWidth = containerRef.current.offsetWidth

    // Calculate how many columns fit
    const columnWidth = itemWidth + gap
    const maxColumns = Math.floor((containerWidth + gap) / columnWidth)
    const columns = Math.max(1, Math.min(maxColumns, items.length))

    // Center the layout
    const totalLayoutWidth = columns * columnWidth - gap
    const leftOffset = Math.max(0, Math.floor((containerWidth - totalLayoutWidth) / 2))

    // Initialize column heights
    const columnHeights = new Array(columns).fill(0)
    const newLayoutItems: LayoutItem<T>[] = []

    // Process each item
    items.forEach(item => {
      const element = measureElementsRef.current.get(item.id)

      if (!element || element.offsetHeight === 0) {
        return
      }

      const itemHeight = element.offsetHeight

      // Find column with minimum height
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

      // Add to layout
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
    setIsReady(true)
  }, [items, itemWidth, gap])

  // Measure items and trigger layout
  const measureAndLayout = useCallback(() => {
    // Wait for all elements to be measured
    const allMeasured = items.every(item => {
      const element = measureElementsRef.current.get(item.id)
      return element && element.offsetHeight > 0
    })

    if (allMeasured) {
      calculateLayout()
    } else {
      setTimeout(measureAndLayout, 50)
    }
  }, [items, calculateLayout])

  // Initialize layout when items change
  useEffect(() => {
    if (items.length > 0) {
      setIsReady(false)
      // Give DOM time to render, then measure
      setTimeout(measureAndLayout, 100)
    }
  }, [items.length, measureAndLayout])

  // Handle resize
  const handleResize = useCallback(() => {
    if (isReady) {
      measureAndLayout()
    }
  }, [isReady, measureAndLayout])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <div className={`${className}`}>
      {/* NO GRID CLASSES - Container for layout */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          height: isReady ? `${containerHeight}px` : 'auto',
          minHeight: '200px'
        }}
      >
        {/* Positioned items (only when ready) */}
        {isReady && (
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

        {/* Measurement items (NO GRID CLASSES) */}
        <div
          className={isReady ? 'opacity-0 pointer-events-none' : 'space-y-4'}
          style={{ width: `${itemWidth}px` }}
        >
          {items.map(item => (
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
    </div>
  )
}
