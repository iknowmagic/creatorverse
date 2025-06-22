import type { Creator } from '../../data/creators'
import { MonumentCard } from './MonumentCard'
import { WhisperCard } from './WhisperCard'
import { StatementCard } from './StatementCard'
import { TakeoverCard } from './TakeoverCard'
import { SplitCard } from './SplitCard'
import { FrameCard } from './FrameCard'

interface CardVariantProps {
  creator: Creator
  index: number
}

// Card type distribution for visual variety
const cardTypes = ['monument', 'whisper', 'statement', 'takeover', 'split', 'frame'] as const

type CardType = (typeof cardTypes)[number]

// Aesthetic-driven card assignment
function getCardType(creator: Creator, index: number): CardType {
  // Use creator ID and index for consistent but varied assignment
  const seed = creator.id + index

  // Some logic for better visual distribution:
  // - Big creators (high follower count) more likely to get Monument
  // - Image-heavy content gets Takeover/Split
  // - Educational content gets Statement/Frame

  const followerCount = creator.followers ? parseInt(creator.followers.replace(/[^\d]/g, '')) : 0

  // High-follower creators weighted toward Monument
  if (followerCount > 50000000 && seed % 4 === 0) {
    return 'monument'
  }

  // Image-heavy categories favor visual cards
  if (
    ['Art & Design', 'Food & Cooking', 'Travel & Adventure'].includes(creator.category) &&
    seed % 3 === 0
  ) {
    return seed % 2 === 0 ? 'takeover' : 'split'
  }

  // Educational content favors structured cards
  if (creator.category === 'Educational Content' && seed % 3 === 0) {
    return seed % 2 === 0 ? 'statement' : 'frame'
  }

  // Otherwise, aesthetic-driven random assignment
  const typeIndex = seed % cardTypes.length
  return cardTypes[typeIndex]
}

export function CardVariant({ creator, index }: CardVariantProps) {
  const cardType = getCardType(creator, index)

  switch (cardType) {
    case 'monument':
      return <MonumentCard creator={creator} />
    case 'whisper':
      return <WhisperCard creator={creator} />
    case 'statement':
      return <StatementCard creator={creator} />
    case 'takeover':
      return <TakeoverCard creator={creator} />
    case 'split':
      return <SplitCard creator={creator} />
    case 'frame':
      return <FrameCard creator={creator} />
    default:
      return <StatementCard creator={creator} />
  }
}
