import type { Creator } from '~/data/creators'

interface ArchiveBlockCardProps {
  creator: Creator
}

export function ArchiveBlockCard({ creator }: ArchiveBlockCardProps) {
  return (
    <div
      className="group relative bg-gray-100 dark:bg-gray-900 hover:shadow-lg border-2 border-gray-900 dark:border-gray-100 aspect-[2/3] overflow-hidden transition-all duration-300 cursor-pointer"
      onClick={() => window.open(creator.url, '_blank')}
    >
      {/* Small category descriptor at top - like "WELTWEIT GROSSTE SAMMLUNG ZUR KUNST DES" */}
      <div className="top-6 right-6 left-6 absolute">
        <div className="font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
          {creator.category}
        </div>
        <div className="mt-1 text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider">
          Content Creator
        </div>
      </div>

      {/* Massive creator name - positioned like "BLAUEN REITER" */}
      <div className="top-1/4 right-6 bottom-1/3 left-6 absolute">
        <h1 className="font-chivo font-black text-gray-900 dark:text-gray-100 text-4xl lg:text-5xl xl:text-6xl break-words uppercase leading-none tracking-tight">
          {creator.name}
        </h1>
      </div>

      {/* Tag line at bottom - like additional info */}
      <div className="right-6 bottom-6 left-6 absolute">
        <div className="mb-2 font-medium text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">
          {creator.tag}
        </div>
        {creator.followers && (
          <div className="text-gray-600 dark:text-gray-400 text-xs">
            {creator.followers} Followers
          </div>
        )}
      </div>

      {/* Subtle hover indicator - top right corner */}
      <div className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="border border-gray-900 dark:border-gray-100 w-3 h-3 rotate-45 transform"></div>
      </div>

      {/* Optional: Description overlay on hover */}
      <div className="absolute inset-0 flex justify-center items-center bg-gray-900/90 dark:bg-gray-100/90 opacity-0 group-hover:opacity-100 p-8 transition-opacity duration-300">
        <p className="text-gray-100 dark:text-gray-900 text-sm text-center leading-relaxed">
          {creator.description}
        </p>
      </div>
    </div>
  )
}
