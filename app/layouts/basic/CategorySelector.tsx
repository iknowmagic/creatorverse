import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getCategories } from '~/lib/client'

interface CategorySelectorProps {
  onCategoryChange?: (category: string | null) => void
}

export function CategorySelector({ onCategoryChange }: CategorySelectorProps) {
  const [categoryAnimated, setCategoryAnimated] = useState<string | null>(null)
  const [categoryHovered, setCategoryHovered] = useState<string | null>(null)
  const [categorySelected, setCategorySelected] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
  }, [])

  const handleCategoryChange = (category: string) => {
    if (categorySelected === category) {
      // If the category is already selected, reset it
      setCategorySelected(null)
      setCategoryAnimated(null)
      if (onCategoryChange) {
        onCategoryChange(null)
      }
    } else {
      setCategorySelected(category)
      setCategoryAnimated(category)
      if (onCategoryChange) {
        onCategoryChange(category)
      }
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
