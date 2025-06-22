import type { Creator } from '~/data/creators'

interface CreatorCardProps {
  creator: Creator
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 p-4 aspect-square">
      <div className="flex justify-center items-center bg-gray-400 dark:bg-gray-600 mb-4 w-full h-32">
        <div className="bg-gray-500 dark:bg-gray-700 w-16 h-16"></div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm normal-case leading-tight">
            {creator.name}
          </h2>
          {creator.followers && (
            <span className="bg-gray-300 dark:bg-gray-700 px-1 py-0.5 text-gray-900 dark:text-gray-100 text-xs">
              {creator.followers}
            </span>
          )}
        </div>
        <p className="flex-1 mb-2 text-gray-700 dark:text-gray-300 text-xs normal-case leading-relaxed">
          {creator.description.substring(0, 80)}...
        </p>
        <div className="mt-auto">
          <div className="inline-block mb-2 px-1 py-0.5 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs">
            {creator.category}
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-2 py-1 w-full font-medium text-gray-100 dark:text-gray-900 text-xs normal-case transition-colors cursor-pointer">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}
