import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { creators } from '../data/creators'
import { CreatorCard } from '../components/CreatorCard'
import { CreatorHero } from '../components/CreatorHero'

export function Welcome() {
  const sliderSettings = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false
  }

  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo uppercase">
      <header className="flex items-center gap-4">
        <h1 className="font-chivo text-8xl">creatorverse</h1>
        <p className="text-shadow-amber-100 max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>
      <menu>
        <div className="divider divider-neutral" />
        <div className="gap-2 grid grid-flow-col auto-cols-auto text-2xl">
          <div>Streaming & Gaming</div>
          <div>Educational Content</div>
          <div>Art & Design</div>
          <div>Tech & Coding</div>
          <div>Lifestyle & Entertainment</div>
        </div>
      </menu>

      <div className="mt-8">
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
