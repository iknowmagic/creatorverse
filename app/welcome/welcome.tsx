import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { creators, categories } from '../data/creators'
import { CreatorCard } from '../components/CreatorCard'
import { CreatorHero } from '../components/CreatorHero'

export default function Welcome() {
  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo uppercase">
      <header className="flex items-center gap-4">
        <h1 className="font-chivo text-8xl">creatorverse</h1>
        <p className="max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>

      <div className="divider divider-neutral"></div>

      <div className="grid grid-cols-4 text-2xl">
        {categories.map(category => (
          <div key={category}>{category}</div>
        ))}
      </div>

      <div className="relative mt-8 mb-8">
        {/* Custom Navigation Buttons */}
        <button className="top-1/2 left-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2 swiper-button-prev-custom">
          <ChevronLeft className="w-5 h-5 text-gray-100 dark:text-gray-900" />
        </button>
        <button className="top-1/2 right-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2 swiper-button-next-custom">
          <ChevronRight className="w-5 h-5 text-gray-100 dark:text-gray-900" />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom'
          }}
          loop={true}
        >
          {creators.map(creator => (
            <SwiperSlide key={creator.id}>
              <CreatorHero creator={creator} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gap-3 grid grid-cols-3">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  )
}
