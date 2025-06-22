import { ReactWookmark } from './ReactWookmark'
import type { Creator } from '~/data/creators'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

// TEXT-BASED CARDS - NEUBRUTALIST/BAUHAUS REDESIGN
function CardType1({ creator }: { creator: Creator }) {
  return (
    <div className="flex flex-col justify-between bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700 aspect-square">
      {/* Minimal header */}
      <div className="mb-6 pb-4 border-gray-200 dark:border-gray-700 border-b">
        <div className="font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.15em]">
          {creator.category}
        </div>
      </div>

      {/* Typography focus */}
      <div className="flex-1">
        <h2 className="mb-4 font-chivo font-normal text-gray-900 dark:text-gray-100 text-2xl leading-[1.1]">
          {creator.name}
        </h2>
        {creator.followers && (
          <div className="font-light text-gray-600 dark:text-gray-400 text-sm">
            {creator.followers}
          </div>
        )}
      </div>

      {/* Understated CTA */}
      <button
        onClick={() => window.open(creator.url, '_blank')}
        className="self-start bg-gray-900 p-5 text-gray-100 btn btn-neutral"
      >
        Visit
      </button>
    </div>
  )
}

function CardType2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 border border-gray-200 dark:border-gray-800 aspect-[4/5]">
      {/* Asymmetrical layout */}
      <div className="flex flex-col h-full">
        <div className="flex-1 pr-8">
          <div className="mb-6 font-medium text-gray-400 dark:text-gray-600 text-xs uppercase tracking-[0.2em]">
            {creator.category}
          </div>

          <h2 className="mb-4 font-chivo font-light text-gray-900 dark:text-gray-100 text-xl leading-tight">
            {creator.name}
          </h2>

          <p className="font-light text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {creator.description}
          </p>
        </div>

        {/* Bottom aligned content */}
        <div className="flex justify-between items-center pt-4 border-gray-200 dark:border-gray-800 border-t">
          {creator.followers && (
            <span className="font-light text-gray-500 dark:text-gray-500 text-xs">
              {creator.followers}
            </span>
          )}
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="border-gray-900 btn-outline w-2/3 text-gray-900 btn"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardType3({ creator }: { creator: Creator }) {
  return (
    <div className="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 aspect-[3/4] overflow-hidden">
      {/* Geometric composition */}
      <div className="top-0 left-0 absolute flex items-center bg-white dark:bg-gray-900 px-6 w-full h-16">
        <h2 className="font-chivo font-medium text-gray-900 dark:text-gray-100 text-lg leading-none">
          {creator.name}
        </h2>
      </div>

      {/* Content area */}
      <div className="flex flex-col justify-between p-6 pt-20 h-full">
        <div>
          <div className="mb-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.15em]">
            {creator.category}
          </div>
          <p className="font-light text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {creator.description.substring(0, 120)}...
          </p>
        </div>

        <div className="flex justify-between items-end">
          {creator.followers && (
            <div className="font-light text-gray-600 dark:text-gray-400 text-xs">
              {creator.followers}
            </div>
          )}
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="bg-gray-900 p-4 w-2/3 text-gray-100 dark:text-gray-900 btn btn-neutral"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

// IMAGE-BASED CARDS - NEUBRUTALIST/BAUHAUS REDESIGN
function CardImage1({ creator }: { creator: Creator }) {
  return (
    <div className="bg-white dark:bg-gray-950 pb-4 border border-gray-200 dark:border-gray-800 aspect-square overflow-hidden">
      {/* Image as compositional element */}
      <div className="relative h-3/5">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${creator.imageURL})` }}
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />

        {/* Floating category */}
        <div className="top-6 left-6 absolute bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1">
          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs uppercase tracking-[0.15em]">
            {creator.category}
          </div>
        </div>
      </div>

      {/* Clean content area */}
      <div className="flex flex-col justify-between gap-1 p-6 h-2/5">
        <div>
          <h2 className="mb-2 font-chivo font-normal text-gray-900 dark:text-gray-100 text-xl leading-tight">
            {creator.name}
          </h2>
          {creator.followers && (
            <div className="font-light text-gray-500 dark:text-gray-400 text-sm">
              {creator.followers}
            </div>
          )}
        </div>

        <button
          onClick={() => window.open(creator.url, '_blank')}
          className="btn-block self-start bg-gray-900 btn btn-neutral"
        >
          Visit
        </button>
      </div>
    </div>
  )
}

function CardImage2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 aspect-[4/5] overflow-hidden">
      {/* Asymmetrical image placement */}
      <div className="relative h-1/2">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${creator.imageURL})` }}
        />
      </div>

      {/* Grid-based content */}
      <div className="flex flex-col gap-4 p-6 h-1/2">
        <div>
          <div className="mb-3 font-medium text-gray-400 dark:text-gray-600 text-xs uppercase tracking-[0.2em]">
            {creator.category}
          </div>
          <h2 className="font-chivo font-light text-gray-900 dark:text-gray-100 text-lg leading-tight">
            {creator.name}
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-2 mt-auto">
          {creator.followers && (
            <div className="font-light text-gray-500 dark:text-gray-500 text-xs text-right">
              {creator.followers}
            </div>
          )}
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="btn-block btn-outline btn"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardImage3({ creator }: { creator: Creator }) {
  return (
    <div className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 aspect-[5/3] overflow-hidden">
      {/* Large compositional image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-40 grayscale"
        style={{ backgroundImage: `url(${creator.imageURL})` }}
      />

      {/* Bauhaus-inspired content block */}
      <div className="right-1/3 bottom-0 left-0 absolute bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm p-6 border-gray-200 dark:border-gray-800 border-t border-r">
        <div className="mb-3 font-medium text-gray-400 dark:text-gray-600 text-xs uppercase tracking-[0.2em]">
          {creator.category}
        </div>
        <h2 className="mb-4 font-chivo font-light text-gray-900 dark:text-gray-100 text-xl leading-tight">
          {creator.name}
        </h2>

        <div className="flex justify-between items-end">
          {creator.followers && (
            <div className="font-light text-gray-500 dark:text-gray-500 text-xs">
              {creator.followers}
            </div>
          )}
          <button
            onClick={() => window.open(creator.url, '_blank')}
            className="bg-gray-900 py-5 text-gray-100 btn btn-neutral"
          >
            Visit
          </button>
        </div>
      </div>

      {/* Additional info block */}
      <div className="top-6 right-6 absolute bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 text-right">
        <div className="font-light text-gray-600 dark:text-gray-400 text-xs">{creator.tag}</div>
      </div>
    </div>
  )
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
  // Text-based card renderer
  const renderTextCard = (creator: Creator, index: number) => {
    const cardType = index % 3

    switch (cardType) {
      case 0:
        return <CardType1 creator={creator} />
      case 1:
        return <CardType2 creator={creator} />
      case 2:
        return <CardType3 creator={creator} />
      default:
        return <CardType2 creator={creator} />
    }
  }

  // Image-based card renderer
  const renderImageCard = (creator: Creator, index: number) => {
    const cardType = index % 3

    switch (cardType) {
      case 0:
        return <CardImage1 creator={creator} />
      case 1:
        return <CardImage2 creator={creator} />
      case 2:
        return <CardImage3 creator={creator} />
      default:
        return <CardImage2 creator={creator} />
    }
  }

  // Main card rendering function with smart selection
  const renderCard = (creator: Creator, index: number) => {
    // Check if creator has a valid image URL
    const hasImage =
      creator.imageURL &&
      creator.imageURL.trim() !== '' &&
      !creator.imageURL.includes('placeholder')

    // If no image, always use text cards
    if (!hasImage) {
      return renderTextCard(creator, index)
    }

    // If has image, randomly choose between text and image variants
    // Using index + creator.id for consistent but varied distribution
    const randomSeed = (index + creator.id) % 10
    const useImageCard = randomSeed < 6 // 60% chance for image cards when available

    return useImageCard ? renderImageCard(creator, index) : renderTextCard(creator, index)
  }

  return <ReactWookmark creators={creators} renderCard={renderCard} className={className} />
}
