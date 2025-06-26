import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { filterByCategory, getCategories, getCreators, type Creator } from '~/lib/client'
import { Card } from './Card'
import { CategorySelector } from './CategorySelector'
import { Error } from './Error'
import { Header } from './Header'
import { InfiniteScrolling } from './InfiniteScrolling'
import { CardsWait, CategoriesWait } from './Wait'

export default function Welcome() {
  const [creators, setCreators] = useState([] as Creator[])
  const [categories, setCategories] = useState<string[]>([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getCreators()
      .then(data => {
        setCreators(data)
      })
      .catch(error => {
        toast.error('Error fetching creators', error)
        setIsError(true)
      })
  }, [])

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {
        toast.error('Error fetching categories')
        setIsError(true)
      })
  }, [])

  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo">
      <Header />

      <div className="divider sm:divider-neutral"></div>

      {!isError &&
        (categories.length == 0 ? (
          <CategoriesWait />
        ) : (
          <CategorySelector
            categories={categories}
            onCategoryChange={(category: string | null) => {
              if (category) {
                filterByCategory(category)
                  .then((data: Creator[]) => {
                    setCreators(data)
                  })
                  .catch((error: unknown) => {
                    toast.error('Error filtering creators by category')
                    setIsError(true)
                  })
              } else {
                // Reset the filter if no category is selected
                getCreators()
                  .then((data: Creator[]) => {
                    setCreators(data)
                  })
                  .catch((error: unknown) => {
                    toast.error('Error fetching creators')
                    setIsError(true)
                  })
              }
            }}
          />
        ))}

      {isError && <Error />}

      {!isError &&
        (creators.length === 0 ? (
          <CardsWait count={12} />
        ) : (
          <InfiniteScrolling
            allItems={creators}
            renderItem={(creator: Creator) => <Card creator={creator} />}
            itemWidth={296}
            gap={12}
            className="mt-8"
            initialCount={12}
            loadMoreCount={18}
          />
        ))}

      <Toaster position="top-right" richColors />
    </main>
  )
}
