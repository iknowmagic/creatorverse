import type { Creator } from '../../data/creators'

interface MonumentCardProps {
  creator: Creator
}

export function MonumentCard({ creator }: MonumentCardProps) {
  return (
    <div className="relative flex flex-col bg-gray-200 dark:bg-gray-800 border-4 border-gray-900 dark:border-gray-100 aspect-square overflow-hidden">
      {/* Small description in top-right */}
      <div className="top-4 right-4 absolute max-w-24">
        <p className="text-gray-700 dark:text-gray-300 text-xs leading-tight">
          {creator.description.substring(0, 60)}...
        </p>
        {creator.followers && (
          <div className="mt-2 font-medium text-gray-900 dark:text-gray-100 text-xs">
            {creator.followers}
          </div>
        )}
      </div>

      {/* Massive creator name at bottom */}
      <div className="right-0 bottom-0 left-0 absolute p-6">
        <h2 className="font-chivo font-black text-gray-900 dark:text-gray-100 text-2xl md:text-3xl lg:text-4xl break-words uppercase leading-none tracking-tight">
          {creator.name}
        </h2>

        {/* Category tag */}
        <div className="inline-block bg-gray-900 dark:bg-gray-100 mt-3 px-2 py-1 font-medium text-gray-100 dark:text-gray-900 text-xs uppercase">
          {creator.tag}
        </div>
      </div>

      {/* Visit button - floating */}
      <button
        onClick={() => window.open(creator.url, '_blank')}
        className="top-4 left-4 absolute bg-transparent hover:bg-gray-900 dark:hover:bg-gray-100 px-3 py-1 border border-gray-900 dark:border-gray-100 font-medium text-gray-900 hover:text-gray-100 dark:hover:text-gray-900 dark:text-gray-100 text-xs uppercase transition-colors"
      >
        Visit
      </button>
    </div>
  )
}
