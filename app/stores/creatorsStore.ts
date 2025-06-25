import { create } from 'zustand'
import type { Creator } from '../data/creators'

const creatorsStore = create<{
  allCreators: Creator[]
  creators: Creator[]
  categorySelected: string | null
  filterByCategory: (category: string | null) => void
  isLoading: boolean
  initializeCreators: (creators: Creator[]) => void
}>(set => ({
  isLoading: false,
  allCreators: [],
  creators: [],
  categorySelected: null,
  filterByCategory: (category: string | null) => {
    set(state => ({
      categorySelected: category,
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
