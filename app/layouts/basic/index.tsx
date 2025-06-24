import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories, orderedCreators, selectedCreators, randomCreators } from '~/data/creators'
import { Carousel, CarouselNavigation } from './Carousel'
import { Gallery } from './Gallery'

export default function Welcome() {
  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo">
      <header className="flex lg:flex-row flex-col items-start lg:items-center gap-4 uppercase">
        <h1 className="font-chivo text-4xl md:text-8xl">creatorverse</h1>
        <p className="lg:max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>

      <div className="divider divider-neutral"></div>

      <div className="gap-2 grid sm:grid-flow-col auto-cols-auto mb-8 md:text-xl lg:text-2xl uppercase">
        {categories.map(category => (
          <div key={category}>{category}</div>
        ))}
      </div>

      <div className="mt-12 mb-8">
        <CarouselNavigation />
      </div>

      <Gallery creators={randomCreators()} className="mt-8" />
    </main>
  )
}
