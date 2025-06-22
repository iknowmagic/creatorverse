import { randomCreators } from '~/data/creators'
import { CardLink } from '~/layouts/advanced/CardLink'

import type { Creator } from '~/data/creators'

// Get a few different creators for variety
const sampleCreators = randomCreators().slice(0, 2)
// const sampleCreators = creators.slice(34, 46)

// CardType1: Clean Stack - Similar to original but no image
export function CardType1({ creator }: { creator: Creator }) {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 p-6 aspect-square">
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight">
            {creator.name}
          </h2>
          {creator.followers && (
            <span className="bg-gray-300 dark:bg-gray-700 px-2 py-1 text-gray-900 dark:text-gray-100 text-xs">
              {creator.followers}
            </span>
          )}
        </div>

        <p className="flex-1 mb-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {creator.description}
        </p>

        <div className="mt-auto">
          <div className="inline-block mb-3 px-2 py-1 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs">
            {creator.category}
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-3 py-2 w-full font-medium text-gray-100 dark:text-gray-900 text-sm transition-colors">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

// CardType2: Minimal Border - Tall and clean
export function CardType2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 border-2 border-gray-900 dark:border-gray-100 aspect-[3/4]">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h2 className="mb-2 font-chivo font-bold text-gray-900 dark:text-gray-100 text-xl leading-tight">
            {creator.name}
          </h2>
          <div className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wide">
            {creator.category}
          </div>
        </div>

        <p className="flex-1 mb-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {creator.description}
        </p>

        <div className="flex justify-between items-center">
          {creator.followers && (
            <span className="text-gray-600 dark:text-gray-400 text-xs">{creator.followers}</span>
          )}
          <button className="bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 px-4 py-2 font-medium text-gray-100 dark:text-gray-900 text-xs uppercase tracking-wide transition-colors">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

// CardType3: Wide Banner - Horizontal layout
export function CardType3({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 border border-gray-400 dark:border-gray-600 aspect-[5/3]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-6">
            <h2 className="mb-3 font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight">
              {creator.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {creator.description.substring(0, 120)}...
            </p>
          </div>

          {creator.followers && (
            <div className="bg-gray-300 dark:bg-gray-700 px-3 py-1 font-medium text-gray-900 dark:text-gray-100 text-xs">
              {creator.followers}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
            {creator.category}
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-4 py-1 font-medium text-gray-100 dark:text-gray-900 text-xs transition-colors">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

export default (
  <div className="gap-4 space-y-12 grid grid-cols-2 bg-gray-50 dark:bg-gray-950 p-6">
    <CardType1 creator={sampleCreators[0]} />
    <CardType2 creator={sampleCreators[1]} />
    <CardType3 creator={sampleCreators[0]} />
  </div>
)
