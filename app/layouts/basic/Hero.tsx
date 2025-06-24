import type { Creator } from '../../data/creators'

interface HeroProps {
  creator: Creator
}

export function Hero({ creator }: HeroProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-800 mx-2 p-8 text-center">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="grayscale rounded-xs w-24 h-24 object-cover aspect-square"
        />
      )}
      {!creator.imageURL && (
        <div className="flex justify-center items-center bg-gray-400 dark:bg-gray-600 mb-6 w-24 h-24">
          <div className="bg-gray-500 dark:bg-gray-700 w-16 h-16"></div>
        </div>
      )}
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
        <div className="px-2 py-1 text-gray-700 dark:text-gray-300 text-xs">{creator.category}</div>
        <button className="btn btn-neutral bg-gray-900">Visit Channel</button>
      </div>
    </div>
  )
}
