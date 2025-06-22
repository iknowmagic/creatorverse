import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreatorCard } from './CreatorCard'
import type { Creator } from '../data/creators'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
  const [visibleItems, setVisibleItems] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const observerRef = useRef<IntersectionObserver>()
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
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.05, // Stagger animation
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1] // Custom easing for brutalist feel
      }
    })
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-gray-300 dark:bg-gray-700 mb-3 aspect-square" />
      ))}
    </div>
  )

  return (
    <div className={`creator-gallery ${className}`}>
      {/* Masonry Grid */}
      <div className="masonry-grid">
        <AnimatePresence>
          {visibleItems.map((creator, index) => (
            <motion.div
              key={creator.id}
              custom={index % LOAD_MORE} // Reset stagger for each batch
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="masonry-item"
            >
              <CreatorCard creator={creator} />
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

      <style jsx>{`
        .masonry-grid {
          display: grid;
          gap: 0.75rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .masonry-item {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>
    </div>
  )
}
