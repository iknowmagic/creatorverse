import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface ModalProps {
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg'
  actions?: React.ReactNode
  className?: string
}

export interface ModalRef {
  showModal: () => void
  close: () => void
  isOpen: boolean
}

export const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, title = 'Modal Title', size = 'md', actions, className = '' }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      showModal: () => setIsOpen(true),
      close: () => setIsOpen(false),
      isOpen
    }))

    const sizeClasses = {
      sm: 'min-w-80 max-w-sm',
      md: 'min-w-96 max-w-md',
      lg: 'min-w-[32rem] max-w-2xl'
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full ${className}`}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="top-0 left-0 absolute bg-gray-900 dark:bg-black w-full h-full"
              style={{ opacity: 0.8 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.25, 0, 1] }}
              className={`
                relative z-10 flex flex-col bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100 
                ${sizeClasses[size]} min-h-40 max-h-[80vh] overflow-hidden
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4">
                <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg uppercase tracking-wide">
                  {title}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center w-6 h-6 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {children}
                </div>
              </div>

              {/* Actions */}
              {actions && <div className="flex justify-end items-center gap-3 p-4">{actions}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

Modal.displayName = 'Modal'
