import type { Creator } from '../../data/creators'

interface WhisperCardProps {
  creator: Creator
}

export function WhisperCard({ creator }: WhisperCardProps) {
  return (
    <div className="relative flex flex-col bg-gray-100 dark:bg-gray-900 p-8 border border-gray-300 dark:border-gray-700 aspect-square">
      {/* Lots of negative space at top */}
      <div className="flex-1"></div>

      {/* Right-aligned content block */}
      <div className="flex flex-col items-end ml-auto max-w-40 text-right">
        {/* Small creator name */}
        <h2 className="mb-3 font-chivo font-medium text-gray-900 dark:text-gray-100 text-sm uppercase leading-tight">
          {creator.name}
        </h2>

        {/* Tiny description */}
        <p className="mb-4 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
          {creator.description.substring(0, 45)}...
        </p>

        {/* Category whisper */}
        <div className="mb-4 text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wide">
          {creator.tag}
        </div>

        {/* Followers if available */}
        {creator.followers && (
          <div className="mb-4 text-gray-400 dark:text-gray-600 text-xs">{creator.followers}</div>
        )}

        {/* Minimal visit link */}
        <button
          onClick={() => window.open(creator.url, '_blank')}
          className="text-gray-900 dark:text-gray-100 text-xs underline hover:no-underline uppercase tracking-wide transition-all"
        >
          Visit
        </button>
      </div>
    </div>
  )
}
