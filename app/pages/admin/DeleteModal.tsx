// pages/admin/DeleteModal.tsx
import { forwardRef, useState } from 'react'
import { supabase, type Creator } from '~/lib/client'
import { Modal, type ModalRef } from './Modal'

interface DeleteModalProps {
  creator: Creator | null
  onSuccess: () => void
}

export const DeleteModal = forwardRef<ModalRef, DeleteModalProps>(({ creator, onSuccess }, ref) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmDelete = async () => {
    if (!creator) return

    setIsLoading(true)

    try {
      const { error: supabaseError } = await supabase.from('creators').delete().eq('id', creator.id)

      if (supabaseError) throw supabaseError

      onSuccess()
      ref && 'current' in ref && ref.current?.close()
    } catch (error) {
      console.error('Failed to delete creator:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const actions = (
    <>
      <button
        className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed"
        onClick={() => ref && 'current' in ref && ref.current?.close()}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 border-2 border-red-600 font-chivo text-white text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed"
        onClick={handleConfirmDelete}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </>
  )

  return (
    <Modal ref={ref} title="Delete Creator" size="sm" actions={actions}>
      <p>
        Are you sure you want to delete <strong>{creator?.name}</strong>?
      </p>
    </Modal>
  )
})

DeleteModal.displayName = 'DeleteModal'
