import { ReactWookmark } from '~/layouts/advanced/ReactWookmark'
import { randomCreators, type Creator } from '~/data/creators'
import {
  CardType1,
  CardType2,
  CardType3,
  CardImage1,
  CardImage2,
  CardImage3
} from '~/layouts/advanced/CreatorGallery'

interface CreatorGalleryProps {
  creators: Creator[]
  className?: string
}

export function CreatorGallery({ creators, className = '' }: CreatorGalleryProps) {
  const renderTextCard = (creator: Creator, index: number) => {
    const cardType = index % 3
    switch (cardType) {
      case 0:
        return (
          <div>
            CardType1
            <CardType1 creator={creator} />
          </div>
        )
      case 1:
        return (
          <div>
            CardType2
            <CardType2 creator={creator} />
          </div>
        )
      case 2:
        return (
          <div>
            CardType3
            <CardType3 creator={creator} />
          </div>
        )
      default:
        return (
          <div>
            CardType1
            <CardType1 creator={creator} />
          </div>
        )
    }
  }

  const renderImageCard = (creator: Creator, index: number) => {
    const cardType = index % 3
    switch (cardType) {
      case 0:
        return (
          <div>
            CardImage1
            <CardImage1 creator={creator} />
          </div>
        )
      case 1:
        return (
          <div>
            CardImage2
            <CardImage2 creator={creator} />
          </div>
        )
      case 2:
        return (
          <div>
            CardImage3
            <CardImage3 creator={creator} />
          </div>
        )
      default:
        return (
          <div>
            CardImage1
            <CardImage1 creator={creator} />
          </div>
        )
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
export default <CreatorGallery creators={randomCreators()} className="mt-8" />
