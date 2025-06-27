import { ReactNode } from 'react'

interface ModalProps {
  id: string
  title: string
  children: ReactNode
  onClose?: () => void
}

export function Modal({ id, title, children, onClose }: ModalProps) {
  const handleClose = () => {
    onClose?.()
    document.getElementById(id)?.close()
  }

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100">
        <h3 className="mb-4 font-libre-bodoni text-gray-900 dark:text-gray-100 text-xl uppercase">
          {title}
        </h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}
