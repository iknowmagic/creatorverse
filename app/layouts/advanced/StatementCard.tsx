import type { Creator } from '../../data/creators'

interface StatementCardProps {
  creator: Creator
}

export function StatementCard({ creator }: StatementCardProps) {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 aspect-square">
      {/* Header section */}
      <div className="flex justify-between items-start p-6 pb-4">
        <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg uppercase leading-tight">
          {creator.name}
        </h2>
        {creator.followers && (
          <div className="bg-gray-900 dark:bg-gray-100 px-2 py-1 font-medium text-gray-100 dark:text-gray-900 text-xs">
            {creator.followers}
          </div>
        )}
      </div>

      {/* Harsh horizontal divider */}
      <div className="bg-gray-900 dark:bg-gray-100 mx-6 h-1"></div>

      {/* Content block */}
      <div className="flex flex-col flex-1 p-6 pt-4">
        {/* Category tag */}
        <div className="mb-4">
          <div className="inline-block px-3 py-1 border border-gray-900 dark:border-gray-100 font-medium text-gray-900 dark:text-gray-100 text-xs uppercase">
            {creator.tag}
          </div>
        </div>

        {/* Description block */}
        <div className="flex-1 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {creator.description}
          </p>
        </div>

        {/* Bottom action */}
        <div className="mt-auto">
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 py-3 w-full font-bold text-gray-100 dark:text-gray-900 text-sm uppercase tracking-wide transition-colors"
          >
            Visit Channel
          </button>
        </div>
      </div>
    </div>
  )
}
