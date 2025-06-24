import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { selectedCreators } from '../../data/creators'
import { Hero } from './Hero'

export function Carousel() {
  return (
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
          <Hero creator={creator} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
