import type { Creator } from '~/data/creators'

// Compact Card - Short height
export function CompactCard({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 border border-gray-900 dark:border-gray-100 w-96">
      <h2 className="mb-2 font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg">
        {creator.name}
      </h2>
      <div className="mb-3 text-gray-600 dark:text-gray-400 text-xs uppercase">
        {creator.category}
      </div>
      <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 py-2 w-full font-medium text-gray-100 dark:text-gray-900 text-sm transition-colors">
        Visit
      </button>
    </div>
  )
}

// Standard Card - Medium height
export function StandardCard({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-900 dark:border-gray-100 w-48">
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
        <button className="bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 px-4 py-2 font-medium text-gray-100 dark:text-gray-900 text-xs uppercase transition-colors">
          Visit
        </button>
      </div>
    </div>
  )
}

// Tall Card - Extended height
export function TallCard({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 border border-gray-400 dark:border-gray-600 w-48">
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
        <div className="bg-gray-300 dark:bg-gray-700 mb-4 px-3 py-2 font-medium text-gray-900 dark:text-gray-100 text-sm text-center">
          {creator.followers} Followers
        </div>
      )}
      <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 py-3 w-full font-bold text-gray-100 dark:text-gray-900 text-sm uppercase tracking-wide transition-colors">
        Visit Channel
      </button>
    </div>
  )
}

// Updated CardVariant to use height variations
export function MasonryCardVariant({ creator, index }: { creator: Creator; index: number }) {
  // Distribute card types for masonry variety
  const cardType = index % 3

  switch (cardType) {
    case 0:
      return <CompactCard creator={creator} />
    case 1:
      return <StandardCard creator={creator} />
    case 2:
      return <TallCard creator={creator} />
    default:
      return <StandardCard creator={creator} />
  }
}
