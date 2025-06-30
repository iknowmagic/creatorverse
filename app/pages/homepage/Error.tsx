import Bomb from '~/assets/bomb.png'

export function Error() {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-900 p-4">
      <img
        src={Bomb}
        alt="Error"
        className="grayscale w-56 h-56"
        style={{ clipPath: 'inset(5px)' }}
      />
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        An unexpected error occurred. Please try again later.
      </p>
    </div>
  )
}
