import Search from '~/assets/search.png'

export function Header() {
  return (
    <header className="flex flex-col items-start uppercase">
      <h1 className="flex font-chivo text-4xl md:text-8xl">
        creatorverse
        <div className="w-32 shiny-container">
          <img
            src={Search}
            alt="Search"
            className="inline-block object-center object-cover shiny-image"
            style={{ clipPath: 'inset(5px)' }}
          />
          <img
            src={Search}
            alt="Search"
            className="inline-block object-center object-cover shine-overlay"
            style={{ clipPath: 'inset(5px)' }}
          />
        </div>
      </h1>
      <p className="mt-[-40px] pl-4 w-full text- text-gray-700 text-md dark:text-gray-300 text-left tracking-[3.5px]">
        A collection of content creators from around the world.
      </p>
    </header>
  )
}
