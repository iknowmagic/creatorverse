import { useRef } from 'react'
import { Modal, type ModalRef } from '~/pages/admin/Modal'

export default function ModalFixture() {
  // Modal refs for different examples
  const basicModalRef = useRef<ModalRef>(null)
  const smallModalRef = useRef<ModalRef>(null)
  const largeModalRef = useRef<ModalRef>(null)
  const actionsModalRef = useRef<ModalRef>(null)
  const editModalRef = useRef<ModalRef>(null)
  const deleteModalRef = useRef<ModalRef>(null)

  // Sample creator data for realistic examples
  const sampleCreator = {
    id: 1,
    name: 'Casey Neistat',
    category: 'YouTube',
    description: 'Filmmaker and YouTuber known for daily vlogs and creative storytelling.',
    url: 'https://youtube.com/user/caseyneistat',
    image_url: 'https://example.com/casey.jpg'
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-8 min-h-screen font-archivo">
      <div className="space-y-8 mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="mb-2 font-libre-bodoni text-gray-900 dark:text-gray-100 text-4xl">
            MODAL COMPONENT
          </h1>
          <div className="bg-gray-900 dark:bg-gray-100 mx-auto w-24 h-0.5"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
            Brutalist Modal System with Framer Motion
          </p>
        </div>

        {/* Demo Controls */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Basic Modal
            </h3>
            <button
              onClick={() => basicModalRef.current?.showModal()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-3 border-2 border-gray-900 dark:border-gray-100 w-full font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            >
              Open Basic Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Default size (md) with no custom actions
            </p>
          </div>

          {/* Small Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Small Modal
            </h3>
            <button
              onClick={() => smallModalRef.current?.showModal()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-3 border-2 border-gray-900 dark:border-gray-100 w-full font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            >
              Open Small Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Compact size for simple confirmations
            </p>
          </div>

          {/* Large Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Large Modal
            </h3>
            <button
              onClick={() => largeModalRef.current?.showModal()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-3 border-2 border-gray-900 dark:border-gray-100 w-full font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            >
              Open Large Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Spacious layout for complex content
            </p>
          </div>

          {/* Custom Actions Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Custom Actions
            </h3>
            <button
              onClick={() => actionsModalRef.current?.showModal()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-3 border-2 border-gray-900 dark:border-gray-100 w-full font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            >
              Open Actions Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Modal with custom action buttons
            </p>
          </div>

          {/* Edit Creator Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Edit Creator
            </h3>
            <button
              onClick={() => editModalRef.current?.showModal()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-3 border-2 border-gray-900 dark:border-gray-100 w-full font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            >
              Open Edit Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Real-world edit modal example
            </p>
          </div>

          {/* Delete Creator Modal */}
          <div className="space-y-3">
            <h3 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Delete Creator
            </h3>
            <button
              onClick={() => deleteModalRef.current?.showModal()}
              className="bg-red-600 hover:bg-red-700 px-4 py-3 border-2 border-red-600 w-full font-chivo text-white text-xs uppercase tracking-wide transition-colors"
            >
              Open Delete Modal
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Destructive action confirmation
            </p>
          </div>
        </div>

        {/* Usage Information */}
        <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-900 dark:border-gray-100">
          <h3 className="mb-4 font-chivo font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
            Usage Information
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <div>
              <strong>Ref Control:</strong> Use modalRef.current?.showModal() and
              modalRef.current?.close()
            </div>
            <div>
              <strong>Sizes:</strong> 'sm' | 'md' | 'lg' - default is 'md'
            </div>
            <div>
              <strong>Actions:</strong> Pass custom action buttons via actions prop
            </div>
            <div>
              <strong>Animations:</strong> Built-in Framer Motion animations with brutalist easing
            </div>
            <div>
              <strong>Accessibility:</strong> Backdrop click to close, escape key support
            </div>
          </div>
        </div>
      </div>

      {/* Modal Instances */}

      {/* Basic Modal */}
      <Modal ref={basicModalRef} title="Basic Modal">
        <p>
          This is a basic modal with default settings. It uses the medium size and has no custom
          actions.
        </p>
        <p className="mt-3">
          You can close this modal by clicking the X button, clicking the backdrop, or pressing
          Escape.
        </p>
      </Modal>

      {/* Small Modal */}
      <Modal ref={smallModalRef} title="Small Modal" size="sm">
        <p>This is a small modal, perfect for simple confirmations or brief messages.</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs">Compact and focused.</p>
      </Modal>

      {/* Large Modal */}
      <Modal ref={largeModalRef} title="Large Modal" size="lg">
        <div className="space-y-4">
          <p>This is a large modal with more space for complex content.</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-600">
            <h4 className="mb-2 font-chivo font-bold text-sm">Example Content Block</h4>
            <p className="text-sm">
              Large modals can accommodate more detailed layouts, forms, or data displays.
            </p>
          </div>
          <ul className="space-y-1 text-sm list-disc list-inside">
            <li>Multiple content sections</li>
            <li>Complex layouts</li>
            <li>Detailed forms</li>
            <li>Data tables or lists</li>
          </ul>
        </div>
      </Modal>

      {/* Custom Actions Modal */}
      <Modal
        ref={actionsModalRef}
        title="Custom Actions"
        actions={
          <>
            <button className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors">
              Secondary
            </button>
            <button
              onClick={() => actionsModalRef.current?.close()}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-4 py-2 border-2 border-gray-900 dark:border-gray-100 font-chivo text-white dark:text-gray-900 text-sm uppercase tracking-wide transition-colors"
            >
              Primary
            </button>
          </>
        }
      >
        <p>This modal demonstrates custom action buttons in the footer.</p>
        <p className="mt-3">
          You can pass any React elements as actions, allowing for flexible button layouts and
          styling.
        </p>
      </Modal>

      {/* Edit Creator Modal */}
      <Modal
        ref={editModalRef}
        title="Edit Creator"
        size="md"
        actions={
          <>
            <button
              onClick={() => editModalRef.current?.close()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Saving changes for:', sampleCreator.name)
                editModalRef.current?.close()
              }}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-4 py-2 border-2 border-gray-900 dark:border-gray-100 font-chivo text-white dark:text-gray-900 text-sm uppercase tracking-wide transition-colors"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p>
            Edit form for: <strong>{sampleCreator.name}</strong>
          </p>
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-chivo text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                defaultValue={sampleCreator.name}
                className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-900 dark:border-gray-600 dark:focus:border-gray-100 focus:outline-none w-full text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-chivo text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                Category
              </label>
              <input
                type="text"
                defaultValue={sampleCreator.category}
                className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-900 dark:border-gray-600 dark:focus:border-gray-100 focus:outline-none w-full text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-chivo text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                URL
              </label>
              <input
                type="url"
                defaultValue={sampleCreator.url}
                className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-900 dark:border-gray-600 dark:focus:border-gray-100 focus:outline-none w-full font-mono text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-chivo text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                Description
              </label>
              <textarea
                rows={3}
                defaultValue={sampleCreator.description}
                className="bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-400 focus:border-gray-900 dark:border-gray-600 dark:focus:border-gray-100 focus:outline-none w-full text-sm resize-none"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Creator Modal */}
      <Modal
        ref={deleteModalRef}
        title="Delete Creator"
        size="sm"
        actions={
          <>
            <button
              onClick={() => deleteModalRef.current?.close()}
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border-2 border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Deleting creator:', sampleCreator.name)
                deleteModalRef.current?.close()
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 border-2 border-red-600 font-chivo text-white text-sm uppercase tracking-wide transition-colors"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <p>
            Are you sure you want to delete <strong>{sampleCreator.name}</strong>?
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600">
            <div className="space-y-1 text-gray-600 dark:text-gray-400 text-xs">
              <div>
                <strong>Category:</strong> {sampleCreator.category}
              </div>
              <div>
                <strong>URL:</strong> {sampleCreator.url}
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  )
}
