import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { categories, randomCreatorImages } from '~/data/creators'
import { Card } from './Card'
import { CarouselNavigation } from './Carousel'
import { MasonryInfiniteScroll } from './MasonryInfiniteScroll'

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
        {categories.map((category: string) => (
          <div key={category}>{category}</div>
        ))}
      </div>

      <div className="mt-12 mb-8">
        <CarouselNavigation />
      </div>

      <MasonryInfiniteScroll
        allItems={randomCreatorImages()}
        renderItem={creator => <Card creator={creator} />}
        itemWidth={296}
        gap={12}
        className="mt-8"
        initialCount={12}
        loadMoreCount={18}
      />
    </main>
  )
}
