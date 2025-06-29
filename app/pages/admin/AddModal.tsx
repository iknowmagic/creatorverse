// pages/admin/AddModal.tsx
import React, { forwardRef, useState } from 'react'
import { supabase } from '~/lib/client'
import { Modal, type ModalRef } from './Modal'
import { useCategories } from './useCreators'

interface AddModalProps {
  onSuccess: () => void
}

export const AddModal = forwardRef<ModalRef, AddModalProps>(({ onSuccess }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: '',
    image_url: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch categories
  const { categories, isLoading: categoriesLoading } = useCategories()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.name.trim() ||
      !formData.url.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      setError('Name, URL, description, and category are required.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase.from('creators').insert({
        name: formData.name.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        image_url: formData.image_url.trim() || null
      })

      if (supabaseError) throw supabaseError

      // Reset form
      setFormData({
        name: '',
        url: '',
        description: '',
        category: '',
        image_url: ''
      })

      onSuccess()
      ref && 'current' in ref && ref.current?.close()
    } catch (err) {
      console.error('Error creating creator:', err)
      setError(err instanceof Error ? err.message : 'Failed to create creator')
    } finally {
      setIsLoading(false)
    }
  }

  const actions = (
    <>
      <button
        type="button"
        onClick={() => ref && 'current' in ref && ref.current?.close()}
        disabled={isLoading}
        className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="add-creator-form"
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 border-2 border-green-600 font-chivo text-white text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating...' : 'Create Creator'}
      </button>
    </>
  )

  return (
    <Modal ref={ref} title="Add New Creator" size="lg" actions={actions}>
      <form id="add-creator-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Name Field */}
        <div>
          <label
            htmlFor="add-name"
            className="block mb-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide"
          >
            Creator Name *
          </label>
          <input
            type="text"
            id="add-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter creator name"
            className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm transition-colors"
            required
          />
        </div>

        {/* URL Field */}
        <div>
          <label
            htmlFor="add-url"
            className="block mb-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide"
          >
            Channel/Page URL *
          </label>
          <input
            type="url"
            id="add-url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://..."
            className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm transition-colors"
            required
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="add-category"
            className="block mb-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide"
          >
            Category *
          </label>
          <select
            id="add-category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm transition-colors"
            required
            disabled={categoriesLoading}
          >
            <option value="" disabled={true}>
              {categoriesLoading ? 'Loading categories...' : 'Select a category'}
            </option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL Field */}
        <div>
          <label
            htmlFor="add-image_url"
            className="block mb-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide"
          >
            Image URL
          </label>
          <input
            type="url"
            id="add-image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            placeholder="https://... (optional)"
            className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm transition-colors"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="add-description"
            className="block mb-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide"
          >
            Description *
          </label>
          <textarea
            id="add-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe what this creator does..."
            rows={4}
            className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm transition-colors resize-none"
            required
          />
        </div>
      </form>
    </Modal>
  )
})

AddModal.displayName = 'AddModal'
