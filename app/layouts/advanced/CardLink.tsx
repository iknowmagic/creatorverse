import { SquareArrowOutUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Creator } from '~/data/creators'

interface ArchiveBlockCardProps {
  creator: Creator
  children: ReactNode
}

export function CardLink({ creator, children }: ArchiveBlockCardProps) {
  return (
    <div
      className={'group relative cursor-pointer transition-all duration-300 hover:shadow-lg'}
      onClick={() => window.open(creator.url, '_blank')}
    >
      {children}

      <div className="absolute inset-0 flex justify-center items-center bg-gray-900/90 dark:bg-gray-100/90 opacity-0 group-hover:opacity-100 p-8 transition-opacity duration-300">
        <p className="text-gray-100 dark:text-gray-900 text-sm text-center leading-relaxed">
          <SquareArrowOutUpRight size={48} />
        </p>
      </div>
    </div>
  )
}
