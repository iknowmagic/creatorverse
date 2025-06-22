import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories, orderedCreators, selectedCreators } from '~/data/creators'
import { CreatorHero } from '~/layouts/advanced/CreatorHero'
import { CreatorGallery } from './CreatorGallery'

export default function Welcome() {
  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo uppercase">
      <header className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
        <h1 className="font-chivo text-4xl md:text-8xl">creatorverse</h1>
        <p className="lg:max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>

      <div className="divider divider-neutral"></div>

      <div className="gap-2 grid sm:grid-flow-col auto-cols-auto mb-8 md:text-xl lg:text-2xl">
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
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom'
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
        >
          {selectedCreators().map(creator => (
            <SwiperSlide key={creator.id}>
              <CreatorHero creator={creator} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🎯 REPLACED: Static grid with dynamic CreatorGallery */}
      <CreatorGallery creators={orderedCreators()} className="mt-8" />
    </main>
  )
}
