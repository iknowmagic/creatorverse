import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { creators } from '../data/creators'
import { CreatorCard } from '../components/CreatorCard'
import { CreatorHero } from '../components/CreatorHero'

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="top-1/2 left-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2"
    >
      <ChevronLeft className="w-5 h-5 text-gray-100 dark:text-gray-900" />
    </button>
  )
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="top-1/2 right-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2"
    >
      <ChevronRight className="w-5 h-5 text-gray-100 dark:text-gray-900" />
    </button>
  )
}

export default function Welcome() {
  const sliderSettings = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  }

  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo uppercase">
      <header className="flex items-center gap-4">
        <h1 className="font-chivo text-8xl">creatorverse</h1>
        <p className="max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>

      <div className="bg-gray-300 dark:bg-gray-700 my-6 w-full h-px"></div>

      <div className="gap-2 grid grid-flow-col auto-cols-auto mb-8 text-2xl">
        <div>Streaming & Gaming</div>
        <div>Educational Content</div>
        <div>Art & Design</div>
        <div>Tech & Coding</div>
        <div>Lifestyle & Entertainment</div>
      </div>

      <div className="relative mt-8 mb-8">
        <Slider {...sliderSettings}>
          {creators.map(creator => (
            <CreatorHero key={creator.id} creator={creator} />
          ))}
        </Slider>
      </div>

      <div className="gap-3 grid grid-cols-3">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  )
}
