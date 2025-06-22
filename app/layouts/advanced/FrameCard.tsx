import type { Creator } from '../../data/creators'

interface FrameCardProps {
  creator: Creator
}

export function FrameCard({ creator }: FrameCardProps) {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-300 dark:border-gray-700 aspect-square">
      {/* Contained image with frame */}
      <div className="relative bg-gray-300 dark:bg-gray-700 mb-4 border border-gray-400 dark:border-gray-600 h-24 overflow-hidden">
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex justify-center items-center bg-gray-400 dark:bg-gray-600 w-full h-full">
            <div className="bg-gray-500 dark:bg-gray-700 w-10 h-10"></div>
          </div>
        )}
      </div>

      {/* Generous text margins */}
      <div className="flex flex-col flex-1">
        {/* Creator name */}
        <h2 className="mb-2 font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase leading-tight">
          {creator.name}
        </h2>

        {/* Description with generous spacing */}
        <p className="flex-1 mb-4 text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
          {creator.description}
        </p>

        {/* Bottom section */}
        <div className="mt-auto">
          {/* Category and followers row */}
          <div className="flex justify-between items-center mb-3">
            <div className="px-2 py-1 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs uppercase">
              {creator.tag}
            </div>
            {creator.followers && (
              <div className="bg-gray-200 dark:bg-gray-800 px-2 py-1 font-medium text-gray-900 dark:text-gray-100 text-xs">
                {creator.followers}
              </div>
            )}
          </div>

          {/* Visit button */}
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 py-2 w-full font-medium text-gray-100 dark:text-gray-900 text-xs uppercase tracking-wide transition-colors"
          >
            Visit Channel
          </button>
        </div>
      </div>
    </div>
  )
}
