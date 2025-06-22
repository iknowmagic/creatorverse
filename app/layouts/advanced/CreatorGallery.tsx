import { ReactWookmark } from './ReactWookmark'
import type { Creator } from '~/data/creators'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

// Simple card variations for masonry testing
function CardType1({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 border border-gray-900 dark:border-gray-100">
      <h2 className="mb-2 font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg">
        {creator.name}
      </h2>
      <div className="mb-3 text-gray-600 dark:text-gray-400 text-xs uppercase">
        {creator.category}
      </div>
      <button
        onClick={() => window.open(creator.url, '_blank')}
        className="btn-block bg-gray-900 btn btn-neutral"
      >
        Visit
      </button>
    </div>
  )
}

function CardType2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-900 dark:border-gray-100">
      <h2 className="mb-3 font-chivo font-bold text-gray-900 dark:text-gray-100 text-xl">
        {creator.name}
      </h2>
      <div className="mb-4 text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wide">
        {creator.category}
      </div>
      <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {creator.description.substring(0, 120)}...
      </p>
      <div className="flex justify-between items-center">
        {creator.followers && (
          <span className="text-gray-600 dark:text-gray-400 text-xs">{creator.followers}</span>
        )}
        <button
          onClick={() => window.open(creator.url, '_blank')}
          className="bg-gray-900 btn btn-neutral"
        >
          Visit
        </button>
      </div>
    </div>
  )
}

function CardType3({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 border border-gray-400 dark:border-gray-600">
      <div className="mb-3 text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider">
        {creator.category}
      </div>
      <h2 className="mb-4 font-chivo font-bold text-gray-900 dark:text-gray-100 text-2xl leading-tight">
        {creator.name}
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {creator.description}
      </p>
      <div className="mb-4 text-gray-600 dark:text-gray-400 text-xs">Tag: {creator.tag}</div>
      {creator.followers && (
        <div className="mb-4 font-medium text-gray-900 dark:text-gray-100 text-xs">
          {creator.followers} Followers
        </div>
      )}
      <button
        onClick={() => window.open(creator.url, '_blank')}
        className="btn-block bg-gray-900 btn btn-neutral"
      >
        Visit Channel
      </button>
    </div>
  )
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
  // Card rendering function for masonry
  const renderCard = (creator: Creator, index: number) => {
    // Distribute card types for height variety
    const cardType = index % 3

    switch (cardType) {
      case 0:
        return <CardType1 creator={creator} />
      case 1:
        return <CardType2 creator={creator} />
      case 2:
        return <CardType3 creator={creator} />
      default:
        return <CardType2 creator={creator} />
    }
  }

  return <ReactWookmark creators={creators} renderCard={renderCard} className={className} />
}
