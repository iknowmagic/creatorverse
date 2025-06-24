import { motion } from 'framer-motion'
import { useState } from 'react'
import { categories } from '../../data/creators'

export function CategorySelector() {
  const [categorySelected, setCategorySelected] = useState<string | null>(null)
  const [categoryAnimated, setCategoryAnimated] = useState<string | null>(null)

  const handleCategoryChange = (category: string) => {
    if (categorySelected === category) {
      setCategorySelected(null)
    } else {
      setCategorySelected(category)
      setCategoryAnimated(category)
    }
  }
  return (
    <div className="gap-3 grid sm:grid-flow-col auto-cols-auto mb-8 md:text-xl lg:text-2xl uppercase">
      {categories.map((category: string) => (
        <div
          className="flex flex-col cursor-pointer"
          key={category}
          onClick={() => handleCategoryChange(category)}
        >
          <div className="border-transparent border-b-2">{category}</div>
          <motion.div
            animate={{
              opacity:
                categoryAnimated === category
                  ? [0, 1, 0, 1, 0, 1] // Blink pattern
                  : categorySelected === category
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
