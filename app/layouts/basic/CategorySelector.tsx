import { motion } from 'framer-motion'
import { useState } from 'react'
import { categories } from '../../data/creators'
import { creatorsStore } from '../../stores/creatorsStore'

export function CategorySelector() {
  const [categoryAnimated, setCategoryAnimated] = useState<string | null>(null)
  const [categoryHovered, setCategoryHovered] = useState<string | null>(null)

  const store = creatorsStore()
  const { categorySelected, filterByCategory } = store

  const handleCategoryChange = (category: string) => {
    if (categorySelected === category) {
      filterByCategory(null)
    } else {
      filterByCategory(category)
      setCategoryAnimated(category)
    }
  }

  return (
    <div className="gap-3 grid sm:grid-flow-col auto-cols-auto mb-8 w-fit md:text-xl lg:text-2xl uppercase">
      {categories.map((category: string) => (
        <div
          className="flex flex-col cursor-pointer"
          key={category}
          onClick={() => handleCategoryChange(category)}
          onMouseEnter={() => setCategoryHovered(category)}
          onMouseLeave={() => setCategoryHovered(null)}
        >
          <div>{category}</div>
          <motion.div
            animate={{
              opacity:
                categoryAnimated === category
                  ? [0, 1, 0, 1, 0, 1] // Blink pattern
                  : categorySelected === category || categoryHovered === category
                    ? 1
                    : 0
            }}
            transition={{
              duration: categoryAnimated === category ? 0.6 : 0.3,
              ease: 'easeInOut'
            }}
            onAnimationComplete={() => {
              if (categoryAnimated === category) {
                setCategoryAnimated(null)
              }
            }}
            className="block bg-black opacity-0 w-full h-0.5"
          ></motion.div>
        </div>
      ))}
    </div>
  )
}
