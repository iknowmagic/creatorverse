// pages/admin/HistoryModals.tsx
import { forwardRef } from 'react'
import { Modal, type ModalRef } from './Modal'
import type { HistoryRecord, RestoreDiff } from './useAdmin'

// Restore Modal
interface RestoreModalProps {
  selectedRecord: HistoryRecord | null
  restoreDiff: RestoreDiff[]
  restoreDiffLoading: boolean
  restoreDiffError: string | null
  onRestore: () => void
  onCancel: () => void
}

export const RestoreModal = forwardRef<ModalRef, RestoreModalProps>(
  (
    { selectedRecord, restoreDiff, restoreDiffLoading, restoreDiffError, onRestore, onCancel },
    ref
  ) => {
    // Get operation type from restore diff data
    const getOperationType = (): 'INSERT' | 'UPDATE' => {
      const idField = restoreDiff.find(field => field.field_name === 'id')
      return idField?.current_value === null ? 'INSERT' : 'UPDATE'
    }

    // Get fields that will change (excluding ID for display)
    const getChangingFields = (): RestoreDiff[] => {
      return restoreDiff.filter(field => field.will_change && field.field_name !== 'id')
    }

    // Check if restore should be disabled
    const isRestoreDisabled =
      restoreDiffLoading || (restoreDiff.length > 0 && getChangingFields().length === 0)

    const actions = (
      <>
        <button
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 border-2 font-chivo text-sm uppercase tracking-wide transition-colors ${
            isRestoreDisabled
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 border-green-600 text-white'
          }`}
          onClick={onRestore}
          disabled={isRestoreDisabled}
        >
          Restore
        </button>
      </>
    )

    return (
      <Modal ref={ref} title="Restore Creator" size="md" actions={actions}>
        <div className="space-y-3">
          <p>
            About to restore <strong>{selectedRecord?.name}</strong>
          </p>

          {/* Loading State */}
          {restoreDiffLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="border-2 border-gray-500 border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                Loading preview...
              </span>
            </div>
          )}

          {/* Error State */}
          {restoreDiffError && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              {restoreDiffError}
            </div>
          )}

          {/* Preview of changes */}
          {!restoreDiffLoading && !restoreDiffError && restoreDiff.length > 0 && (
            <>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600">
                <div className="space-y-1 text-gray-600 dark:text-gray-400 text-xs">
                  <div>
                    <strong>Operation:</strong>{' '}
                    {getOperationType() === 'INSERT'
                      ? 'Recreate deleted creator'
                      : 'Update existing creator'}
                  </div>
                  {getChangingFields().length > 0 && (
                    <div>
                      <strong>Changes:</strong>{' '}
                      {getChangingFields()
                        .map(field => field.field_name)
                        .join(', ')}
                    </div>
                  )}
                  <div>
                    <strong>Category:</strong> {selectedRecord?.category}
                  </div>
                </div>
              </div>

              {getChangingFields().length === 0 ? (
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No changes needed - the creator is already in this state.
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This will{' '}
                  {getOperationType() === 'INSERT'
                    ? 'recreate the creator'
                    : 'update the existing creator'}{' '}
                  with this historical data.
                </p>
              )}
            </>
          )}
        </div>
      </Modal>
    )
  }
)

RestoreModal.displayName = 'RestoreModal'

// Delete from History Modal
interface DeleteHistoryModalProps {
  selectedRecord: HistoryRecord | null
  onDelete: () => void
  onCancel: () => void
}

export const DeleteHistoryModal = forwardRef<ModalRef, DeleteHistoryModalProps>(
  ({ selectedRecord, onDelete, onCancel }, ref) => {
    const actions = (
      <>
        <button
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 border-2 border-red-600 font-chivo text-white text-sm uppercase tracking-wide transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </>
    )

    return (
      <Modal ref={ref} title="Delete from History" size="sm" actions={actions}>
        <p>
          Remove this history record for <strong>{selectedRecord?.name}</strong>?
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          This will permanently delete this specific history entry.
        </p>
      </Modal>
    )
  }
)

DeleteHistoryModal.displayName = 'DeleteHistoryModal'

// Clear All History Modal
interface ClearHistoryModalProps {
  onClear: () => void
  onCancel: () => void
}

export const ClearHistoryModal = forwardRef<ModalRef, ClearHistoryModalProps>(
  ({ onClear, onCancel }, ref) => {
    const actions = (
      <>
        <button
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 border-2 border-red-600 font-chivo text-white text-sm uppercase tracking-wide transition-colors"
          onClick={onClear}
        >
          Clear All
        </button>
      </>
    )

    return (
      <Modal ref={ref} title="Clear All History" size="sm" actions={actions}>
        <div className="space-y-3">
          <p>
            Are you sure you want to clear <strong>all history records</strong>?
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800">
            <p className="font-medium text-red-700 dark:text-red-400 text-sm">
              ⚠️ This action cannot be undone
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            All creator change history will be permanently deleted.
          </p>
        </div>
      </Modal>
    )
  }
)

ClearHistoryModal.displayName = 'ClearHistoryModal'
