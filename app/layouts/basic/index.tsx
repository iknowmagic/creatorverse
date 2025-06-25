import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { filterByCategory, getCategories, getCreators, type Creator } from '~/lib/client'
import { Card } from './Card'
import { CategorySelector } from './CategorySelector'
import { Header } from './Header'
import { InfiniteScrolling } from './InfiniteScrolling'
import { CardsWait, CategoriesWait } from './Wait'

export default function Welcome() {
  const [creators, setCreators] = useState([] as Creator[])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    getCreators()
      .then(data => {
        setCreators(data)
      })
      .catch(error => {
        console.error('Error fetching creators:', error)
      })
  }, [])

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
  }, [])

  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo">
      <Header />

      <div className="divider sm:divider-neutral"></div>

      {categories.length == 0 && <CategoriesWait />}

      {categories.length > 0 && (
        <CategorySelector
          categories={categories}
          onCategoryChange={category => {
            if (category) {
              filterByCategory(category)
                .then(data => {
                  setCreators(data)
                })
                .catch(error => {
                  console.error('Error filtering creators by category:', error)
                })
            } else {
              // Reset the filter if no category is selected
              getCreators()
                .then(data => {
                  setCreators(data)
                })
                .catch(error => {
                  console.error('Error fetching creators:', error)
                })
            }
          }}
        />
      )}

      {creators.length === 0 && <CardsWait count={12} />}
      {creators.length > 0 && (
        <InfiniteScrolling
          allItems={creators}
          renderItem={creator => <Card creator={creator} />}
          itemWidth={296}
          gap={12}
          className="mt-8"
          initialCount={12}
          loadMoreCount={18}
        />
      )}
    </main>
  )
}
