import Search from '~/assets/search.png'

export function Header() {
  return (
    <header className="flex lg:flex-row flex-col items-start lg:items-center gap-4 uppercase">
      <h1 className="flex font-chivo text-4xl md:text-8xl">
        creatorverse
        <div className="w-32 image-shiny-wrapper">
          <img
            src={Search}
            alt="Search"
            className="inline-block object-center object-cover"
            style={{ clipPath: 'inset(5px)' }}
          />
        </div>
      </h1>
      <p className="lg:max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
        A collection of content creators from around the world.
      </p>
    </header>
  )
}
