export function Welcome() {
  return (
    <main className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 min-w-[360px] max-w-[960px] min-h-screen font-archivo uppercase">
      <header className="flex items-center gap-4">
        <h1 className="font-chivo text-8xl">creatorverse</h1>
        <p className="text-shadow-amber-100 max-w-48 text-gray-700 dark:text-gray-300 text-sm text-left">
          A collection of content creators from around the world.
        </p>
      </header>
      <div className="divider divider-neutral" />
      <div className="gap-2 grid grid-flow-col auto-cols-auto text-2xl">
        <div>Streaming & Gaming</div>
        <div>Educational Content</div>
        <div>Art & Design</div>
        <div>Tech & Coding</div>
        <div>Lifestyle & Entertaiment</div>
      </div>

      <div className="w-full carousel">
        <div id="slide1" className="relative w-full carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            className="w-full"
          />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between -translate-y-1/2 transform">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="relative w-full carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full"
          />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between -translate-y-1/2 transform">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="relative w-full carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full"
          />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between -translate-y-1/2 transform">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="relative w-full carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full"
          />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between -translate-y-1/2 transform">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
