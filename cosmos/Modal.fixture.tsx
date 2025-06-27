import React from 'react'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
  cancelText?: string
  submitText?: string
  onCancel?: () => void
  onSubmit?: () => void
  className?: string
  title?: string
}

export function Modal({
  isOpen = false,
  children,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  className,
  title = 'Modal Title'
}: ModalProps) {
  return (
    <div
      className={`top-0 left-0 absolute flex flex-col justify-center items-center w-full h-screen ${isOpen ? 'block' : 'hidden'} ${className}`}
    >
      <div className="top-0 left-0 absolute bg-slate-600 opacity-80 w-full h-full"></div>
      <div className="z-10 flex flex-col bg-white p-4 border-2 border-slate-400 min-w-80 min-h-40">
        <div>{title}</div>
        <div className="mt-1 text-sm">{children}</div>
        <div className="flex justify-end gap-2 mt-auto">
          <button onClick={onCancel} className="btn">
            {cancelText || 'Cancel'}
          </button>
          <button onClick={onSubmit} className="btn btn-primary">
            {submitText || 'Submit'}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export function ModalContent() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ipsum dolor sit
      amet consectetur adipisicing elit. Quisquam, voluptatum. ipsum dolor sit amet consectetur
      adipisicing elit. Quisquam, voluptatum. ipsum dolor sit amet consectetur adipisicing elit.
      Quisquam, voluptatum. ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ipsum dolor sit amet
      consectetur adipisicing elit. Quisquam, voluptatum. ipsum dolor sit amet consectetur
      adipisicing elit. Quisquam, voluptatum. ipsum dolor sit amet consectetur adipisicing elit.
      Quisquam, voluptatum. ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      <Modal isOpen={true}>hello</Modal>
    </div>
  )
}

export default { Modal, ModalContent }
