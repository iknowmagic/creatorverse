import type { Creator } from '~/data/creators'

interface ArchiveBlockCardProps {
  creator: Creator
}

export function ArchiveBlockCard({ creator }: ArchiveBlockCardProps) {
  return (
    <div className="relative gap-4 grid grid-cols-4 grid-rows-2 bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-900 dark:border-gray-100 aspect-[2/3] text-right uppercase">
      <div className="self-end col-span-3 col-start-2 row-start-2 text-gray-700 text-sm">
        {creator.description}
      </div>
      <div className="col-span-3 col-start-2 row-start-1 text-gray-400 text-xs">
        {creator.category}
      </div>
      <div className="col-span-4 text-2xl break-word tracking-tight">{creator.name}</div>
    </div>
  )
}
