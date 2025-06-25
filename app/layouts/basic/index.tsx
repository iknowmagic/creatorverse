import { useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { randomCreatorImages } from '~/data/creators'
import { creatorsStore } from '../../stores/creatorsStore'
import { Card } from './Card'
import { CategorySelector } from './CategorySelector'
import { Header } from './Header'
import { InfiniteScrolling } from './InfiniteScrolling'

export default function Welcome() {
  const store = creatorsStore()

  useEffect(() => {
    store.initializeCreators(randomCreatorImages())
  }, [])

  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo">
      <Header />

      <div className="divider sm:divider-neutral"></div>

      <CategorySelector />

      <InfiniteScrolling
        allItems={store.creators}
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
