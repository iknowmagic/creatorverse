import { create } from 'zustand'
import type { Creator } from '../data/creators'

const creatorsStore = create<{
  allCreators: Creator[]
  creators: Creator[]
  selectedCategory: string | null
  filterByCategory: (category: string | null) => void
  isLoading: boolean
  initializeCreators: (creators: Creator[]) => void
}>(set => ({
  isLoading: false,
  allCreators: [],
  creators: [],
  selectedCategory: null,
  filterByCategory: (category: string | null) => {
    set(state => ({
      selectedCategory: category,
      creators: category
        ? state.allCreators.filter(creator => creator.category === category)
        : state.allCreators // Show all when no category
    }))
  },
  initializeCreators: (creators: Creator[]) => {
    set(() => ({
      allCreators: creators,
      creators: creators // Initialize with all creators
    }))
  }
}))

export { creatorsStore }
