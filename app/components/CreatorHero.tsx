import type { Creator } from '../data/creators'

interface CreatorHeroProps {
  creator: Creator
}

export function CreatorHero({ creator }: CreatorHeroProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-800 mx-2 p-8 text-center">
      <div className="flex justify-center items-center bg-gray-400 dark:bg-gray-600 mb-6 w-24 h-24">
        <div className="bg-gray-500 dark:bg-gray-700 w-16 h-16"></div>
      </div>
      <h1 className="mb-2 font-chivo font-bold text-gray-900 dark:text-gray-100 text-2xl normal-case">
        {creator.name}
      </h1>
      {creator.followers && (
        <div className="bg-gray-300 dark:bg-gray-700 mb-3 px-3 py-1 font-medium text-gray-900 dark:text-gray-100 text-sm">
          {creator.followers}
        </div>
      )}
      <p className="mb-4 max-w-xs text-gray-700 dark:text-gray-300 text-sm normal-case leading-relaxed">
        {creator.description}
      </p>
      <div className="flex flex-col gap-2">
        <div className="px-2 py-1 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs">
          {creator.category}
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-4 py-2 font-medium text-gray-100 dark:text-gray-900 text-sm normal-case transition-colors">
          Visit Channel
        </button>
      </div>
    </div>
  )
}
