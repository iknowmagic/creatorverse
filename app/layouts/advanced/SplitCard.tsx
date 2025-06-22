import type { Creator } from '../../data/creators'

interface SplitCardProps {
  creator: Creator
}

export function SplitCard({ creator }: SplitCardProps) {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 aspect-square">
      {/* Header with name */}
      <div className="p-4 pb-0">
        <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-base uppercase leading-tight">
          {creator.name}
        </h2>
      </div>

      {/* Sharp divider */}
      <div className="bg-gray-900 dark:bg-gray-100 mx-4 my-3 h-px"></div>

      {/* Split content area */}
      <div className="flex flex-col flex-1 px-4 pb-4">
        {/* Image section - takes up ~40% */}
        <div className="relative bg-gray-400 dark:bg-gray-600 mb-3 h-20 overflow-hidden">
          {creator.imageURL ? (
            <img src={creator.imageURL} alt={creator.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex justify-center items-center bg-gray-500 dark:bg-gray-700 w-full h-full">
              <div className="bg-gray-600 dark:bg-gray-800 w-8 h-8"></div>
            </div>
          )}
        </div>

        {/* Text stack section */}
        <div className="flex flex-col flex-1">
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block bg-gray-300 dark:bg-gray-700 px-2 py-1 font-medium text-gray-900 dark:text-gray-100 text-xs uppercase">
              {creator.tag}
            </span>
          </div>

          {/* Description */}
          <p className="flex-1 mb-3 text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
            {creator.description.substring(0, 100)}...
          </p>

          {/* Bottom row */}
          <div className="flex justify-between items-center mt-auto">
            {creator.followers && (
              <div className="text-gray-600 dark:text-gray-400 text-xs">{creator.followers}</div>
            )}
            <button
              onClick={() => window.open(creator.url, '_blank')}
              className="bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 px-3 py-1 font-medium text-gray-100 dark:text-gray-900 text-xs uppercase transition-colors"
            >
              Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
