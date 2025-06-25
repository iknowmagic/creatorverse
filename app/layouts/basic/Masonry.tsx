import { AnimatePresence, motion } from 'framer-motion'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

interface MasonryProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  itemWidth?: number
  gap?: number
  className?: string
  onLayoutComplete?: (height: number) => void
}

interface LayoutItem<T> {
  item: T
  id: string | number
  x: number
  y: number
  width: number
  height: number
}

export interface MasonryRef {
  getContainerHeight: () => number
  isLayoutReady: () => boolean
}

interface MasonryInternalProps<T extends { id: string | number }> extends MasonryProps<T> {}

interface MasonryState<T> {
  layoutItems: LayoutItem<T>[]
  containerHeight: number
  isLayoutReady: boolean
}

interface MeasurementItemProps<T> {
  item: T
  itemWidth: number
  renderItem: (item: T) => React.ReactNode
  measureElementsRef: React.MutableRefObject<Map<string | number, HTMLDivElement>>
}

export const Masonry = forwardRef<MasonryRef, MasonryProps<any>>(function Masonry<
  T extends { id: string | number }
>(
  {
    items,
    renderItem,
    itemWidth = 300,
    gap = 16,
    className = '',
    onLayoutComplete
  }: MasonryProps<T>,
  ref: React.Ref<MasonryRef>
) {
  const [layoutItems, setLayoutItems] = useState<LayoutItem<T>[]>([])
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const measureElementsRef = useRef<Map<string | number, HTMLDivElement>>(new Map())

  // Expose methods to parent via ref
  useImperativeHandle(
    ref,
    (): MasonryRef => ({
      getContainerHeight: () => containerHeight,
      isLayoutReady: () => isLayoutReady
    })
  )

  // Layout calculation
  const calculateLayout = useCallback((): void => {
    if (!containerRef.current || items.length === 0) return

    const containerWidth: number = containerRef.current.offsetWidth
    const columnWidth: number = itemWidth + gap
    const maxColumns: number = Math.floor((containerWidth + gap) / columnWidth)
    const columns: number = Math.max(1, Math.min(maxColumns, items.length))

    // Center the layout
    const totalLayoutWidth: number = columns * columnWidth - gap
    const leftOffset: number = Math.max(0, Math.floor((containerWidth - totalLayoutWidth) / 2))

    // Initialize column heights
    const columnHeights: number[] = new Array(columns).fill(0)
    const newLayoutItems: LayoutItem<T>[] = []

    // Process each item
    items.forEach((item: T) => {
      const element = measureElementsRef.current.get(item.id)
      if (!element || element.offsetHeight === 0) return

      const itemHeight: number = element.offsetHeight

      // Find shortest column
      let minHeight: number = columnHeights[0]
      let minColumn: number = 0
      for (let i = 1; i < columns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i]
          minColumn = i
        }
      }

      // Calculate position
      const x: number = leftOffset + minColumn * columnWidth
      const y: number = minHeight

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

    const finalHeight: number = Math.max(...columnHeights) - gap

    setLayoutItems(newLayoutItems)
    setContainerHeight(finalHeight)
    setIsLayoutReady(true)

    // Notify parent component
    onLayoutComplete?.(finalHeight)
  }, [items, itemWidth, gap, onLayoutComplete])

  // Measure and layout
  const measureAndLayout = useCallback((): void => {
    const allMeasured: boolean = items.every((item: T) => {
      const element = measureElementsRef.current.get(item.id)
      return element && element.offsetHeight > 0
    })

    if (allMeasured) {
      calculateLayout()
    } else {
      setTimeout(measureAndLayout, 50)
    }
  }, [items, calculateLayout])

  // Trigger layout when items change - NO flash fix applied here
  useEffect((): void => {
    if (items.length > 0) {
      setIsLayoutReady(false)
      setTimeout(measureAndLayout, 50)
      measureElementsRef.current.clear()
    }
  }, [items.length, measureAndLayout])

  // Handle resize
  const handleResize = useCallback((): void => {
    if (isLayoutReady) {
      measureAndLayout()
    }
  }, [isLayoutReady, measureAndLayout])

  useEffect((): (() => void) => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <div className={className}>
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
            {layoutItems.map((layoutItem: LayoutItem<any>, index: number) => (
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

        {/* Measurement items - hidden and positioned to not affect layout */}
        <div
          className="top-0 left-0 absolute opacity-0 pointer-events-none"
          style={{ width: `${itemWidth}px`, zIndex: -1 }}
        >
          {items.map((item: any) => (
            <div
              key={`measure-${item.id}`}
              style={{ width: `${itemWidth}px` }}
              ref={(el: HTMLDivElement | null) => {
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
})
