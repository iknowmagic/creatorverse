import { ExternalLink, Link } from 'lucide-react'
import type { Creator } from '~/lib/client'

interface CardProps {
  creator: Creator
  className?: string
}

export function Card({ creator, className }: CardProps) {
  return (
    <a
      href={creator?.url}
      className={`group relative flex flex-col p-4 border border-gray-400 min-w-[250px] h-full bg-white ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex justify-between items-start">
        <div className="font-libre-bodoni text-gray-900 text-3xl">{creator?.name}</div>
        <div className="text-gray-600">
          <Link />
        </div>
      </div>
      <div className="text-gray-600">{creator?.category}</div>
      <div className="divider divider-neutral"></div>
      <div className="text-gray-700">{creator?.description}</div>
      {creator?.image_url && (
        <div className="relative mt-auto pt-6">
          <img
            src={creator?.image_url}
            alt={creator?.name}
            className="grayscale rounded-xs w-full object-cover aspect-video"
          />
        </div>
      )}

      <div className="top-0 left-0 absolute flex justify-center items-center bg-gray-800 opacity-0 group-hover:opacity-80 w-full h-full text-white transition-opacity">
        <ExternalLink size={48} />
      </div>
    </a>
  )
}
