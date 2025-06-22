import type { Creator } from '../../data/creators'

interface TakeoverCardProps {
  creator: Creator
}

export function TakeoverCard({ creator }: TakeoverCardProps) {
  return (
    <div
      className="group relative bg-gray-400 dark:bg-gray-600 aspect-square overflow-hidden cursor-pointer"
      onClick={() => window.open(creator.url, '_blank')}
    >
      {/* Background image - bleeds to edges */}
      <div
        className="absolute inset-0 bg-gray-500 dark:bg-gray-700 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
        style={{
          backgroundImage: creator.imageURL ? `url(${creator.imageURL})` : 'none',
          backgroundColor: creator.imageURL ? 'transparent' : undefined
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
      </div>

      {/* Minimal text overlay - bottom left */}
      <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black via-black/50 to-transparent p-4">
        <h2 className="mb-1 font-chivo font-bold text-white text-lg leading-tight">
          {creator.name}
        </h2>
        <div className="flex justify-between items-center">
          <div className="text-white/80 text-xs uppercase tracking-wide">{creator.tag}</div>
          {creator.followers && (
            <div className="bg-white/20 backdrop-blur-sm px-2 py-1 font-medium text-white text-xs">
              {creator.followers}
            </div>
          )}
        </div>
      </div>

      {/* Hover state indicator */}
      <div className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
