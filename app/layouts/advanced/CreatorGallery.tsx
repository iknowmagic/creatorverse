import { ReactWookmark } from './ReactWookmark'
import type { Creator } from '~/data/creators'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

// TEXT-ONLY CARDS
function CardType1({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <div className="card-body">
        <div className="badge-outline badge badge-sm">{creator.category}</div>
        <h2 className="card-title">{creator.name}</h2>
        <p className="text-sm">{creator.description}</p>
        {creator.followers && <p className="opacity-70 text-sm">{creator.followers}</p>}
        <div className="justify-end card-actions">
          <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardType2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <div className="card-body">
        <h2 className="card-title">{creator.name}</h2>
        <div className="badge badge-secondary badge-sm">{creator.category}</div>
        <p className="text-sm">{creator.description}</p>
        {creator.followers && <p className="opacity-70 text-sm">{creator.followers}</p>}
        <div className="justify-end card-actions">
          <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardType3({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{creator.name}</h2>
          <div className="text-xs line-clamp-1 badge-sm badge badge-accent">{creator.category}</div>
        </div>
        <p className="text-sm">{creator.description}</p>
        <div className="flex justify-between items-center mt-4">
          {creator.followers && <span className="opacity-70 text-sm">{creator.followers}</span>}
          <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

// IMAGE CARDS
function CardImage1({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <figure>
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="grayscale w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="badge-outline badge badge-sm">{creator.category}</div>
        <h2 className="card-title">{creator.name}</h2>
        {creator.followers && <p className="opacity-70 text-sm">{creator.followers}</p>}
        <div className="justify-end card-actions">
          <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardImage2({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <figure>
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="grayscale w-full h-32 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{creator.name}</h2>
        <div className="badge badge-secondary badge-sm">{creator.category}</div>
        <p className="text-sm">{creator.description.substring(0, 80)}...</p>
        <div className="flex justify-between items-center mt-2">
          {creator.followers && <span className="opacity-70 text-sm">{creator.followers}</span>}
          <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function CardImage3({ creator }: { creator: Creator }) {
  return (
    <div className="bg-base-100 shadow card">
      <div className="flex">
        <figure className="w-1/3">
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="grayscale w-full h-full object-cover"
          />
        </figure>
        <div className="w-2/3 card-body">
          <div className="text-xs line-clamp-1 badge-sm badge badge-accent">{creator.category}</div>
          <h2 className="text-base card-title">{creator.name}</h2>
          <p className="text-sm">{creator.description.substring(0, 60)}...</p>
          <div className="flex justify-between items-center">
            {creator.followers && <span className="opacity-70 text-xs">{creator.followers}</span>}
            <button onClick={() => window.open(creator.url, '_blank')} className="btn btn-primary">
              Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
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
        return <CardType1 creator={creator} />
    }
  }

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
        return <CardImage1 creator={creator} />
    }
  }

  const renderCard = (creator: Creator, index: number) => {
    const hasImage =
      creator.imageURL &&
      creator.imageURL.trim() !== '' &&
      !creator.imageURL.includes('placeholder')

    if (!hasImage) {
      return renderTextCard(creator, index)
    }

    const randomSeed = (index + creator.id) % 10
    const useImageCard = randomSeed < 7

    return useImageCard ? renderImageCard(creator, index) : renderTextCard(creator, index)
  }

  return <ReactWookmark creators={creators} renderCard={renderCard} className={className} />
}

export { CardType1, CardType2, CardType3, CardImage1, CardImage2, CardImage3 }
