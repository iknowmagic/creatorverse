import type { Creator } from '~/data/creators'

interface ArchiveBlockCardProps {
  creator: Creator
}

export function ArchiveBlockCard({ creator }: ArchiveBlockCardProps) {
  return (
    <div className="relative gap-4 grid grid-cols-4 bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-900 dark:border-gray-100 aspect-[2/3] text-right uppercase">
      <div className="col-span-3 col-start-2 row-start-3 text-gray-700 text-xs">
        {creator.description}
      </div>
      <div className="col-span-3 col-start-2 row-start-1 text-gray-400 text-xs">
        {creator.category}
      </div>
      <div className="col-span-4 row-start-2 mt-auto text-6xl break-all tracking-tight">
        {creator.name}
      </div>
    </div>
  )
}
