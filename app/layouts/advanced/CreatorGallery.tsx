import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardVariant } from './CardVariant'
import type { Creator } from '../data/creators'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
  const [visibleItems, setVisibleItems] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const observerRef = useRef<IntersectionObserver | undefined>(undefined)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Initial load - 10 items
  const INITIAL_LOAD = 10
  // Per scroll - 20 items
  const LOAD_MORE = 20

  // Load more creators
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simulate async loading (in real app, this would be API call)
    setTimeout(() => {
      const nextIndex = currentIndex + LOAD_MORE
      const newItems = creators.slice(currentIndex, nextIndex)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setVisibleItems(prev => [...prev, ...newItems])
        setCurrentIndex(nextIndex)

        // Check if we've loaded all items
        if (nextIndex >= creators.length) {
          setHasMore(false)
        }
      }

      setIsLoading(false)
    }, 500) // Small delay for smooth UX
  }, [creators, currentIndex, isLoading, hasMore])

  // Initial load
  useEffect(() => {
    if (creators.length > 0) {
      const initialItems = creators.slice(0, INITIAL_LOAD)
      setVisibleItems(initialItems)
      setCurrentIndex(INITIAL_LOAD)
      setHasMore(creators.length > INITIAL_LOAD)
    }
  }, [creators])

  // Intersection Observer setup
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
        // Trigger when sentinel is 200px from viewport
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

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1] as const // Custom easing for brutalist feel
      }
    }
  }

  // Loading skeleton component - varied heights for card variety
  const LoadingSkeleton = () => (
    <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-gray-700 ${
            i % 3 === 0 ? 'aspect-square' : i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[5/4]'
          }`}
        />
      ))}
    </div>
  )

  return (
    <div className={`creator-gallery ${className}`}>
      {/* Masonry Grid - Using Tailwind Grid Classes */}
      <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visibleItems.map((creator, index) => (
            <motion.div
              key={creator.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: (index % LOAD_MORE) * 0.05, // Stagger animation, reset for each batch
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1] as const
              }}
              className="break-inside-avoid"
            >
              <CardVariant creator={creator} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <LoadingSkeleton />
        </motion.div>
      )}

      {/* Intersection Observer Sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center items-center h-10">
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm uppercase">
              <div className="border-2 border-gray-500 border-t-transparent rounded-full w-4 h-4 animate-spin" />
              Loading More Creators
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && visibleItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 mb-8 text-center"
        >
          <div className="inline-block px-4 py-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm uppercase">
            End of Gallery — {creators.length} Total Creators
          </div>
        </motion.div>
      )}
    </div>
  )
}
