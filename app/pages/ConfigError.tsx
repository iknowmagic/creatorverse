import ErrorIcon from '~/assets/error.png'

export function ConfigError() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-8 min-h-screen font-archivo">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        {/* Error Icon */}
        <img
          src={ErrorIcon}
          alt="Error"
          className="grayscale w-32 h-32"
          style={{ clipPath: 'inset(5px)' }}
        />

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-libre-bodoni text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl uppercase">
            Configuration Error
          </h1>

          <div className="bg-gray-900 dark:bg-gray-100 mx-auto w-16 h-0.5"></div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Sorry, we are experiencing problems at the moment, please try later.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
          <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
          <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
        </div>
      </div>
    </div>
  )
}
