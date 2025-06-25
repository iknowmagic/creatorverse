import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card } from './Card'

export function Carousel({ creators }: { creators: any[] }) {
  const selectedCreators = creators.length > 20 ? creators.slice(0, 20) : creators
  return (
    <div className="relative mx-auto px-2 sm:px-10 lg:px-0 h-[400px]">
      <Swiper
        effect="coverflow"
        modules={[Navigation, Autoplay, EffectCoverflow]}
        slidesPerView={1} // default for mobile
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 }
        }}
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
        className="h-full"
      >
        {selectedCreators.map(creator => (
          <SwiperSlide key={creator.id} className="flex justify-center items-center h-full">
            <Card creator={creator} className="w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export function CarouselNavigation({ creators }: { creators: any[] }) {
  return (
    <div className="relative mt-8 mb-8">
      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom hidden sm:block top-1/2 left-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2 cursor-pointer">
        <ChevronLeft className="w-5 h-5 text-gray-100 dark:text-gray-900" />
      </button>
      <button className="swiper-button-next-custom hidden sm:block top-1/2 right-2 z-10 absolute bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 p-2 transition-colors -translate-y-1/2 cursor-pointer">
        <ChevronRight className="w-5 h-5 text-gray-100 dark:text-gray-900" />
      </button>

      <Carousel creators={creators} />
    </div>
  )
}
