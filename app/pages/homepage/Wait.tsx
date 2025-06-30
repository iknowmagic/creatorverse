export function CategoryWait() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="skeleton w-24 h-5"></div>
      <div className="skeleton w-32 h-5"></div>
    </div>
  )
}

export function CategoriesWait() {
  return (
    <div className="flex gap-2 mb-12 w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <CategoryWait key={index} />
      ))}
    </div>
  )
}

export function CardWait() {
  return (
    <div className="relative flex flex-col bg-white p-4 border border-gray-200 min-w-[250px] h-full">
      {/* Header: Name and Icon */}
      <div className="flex justify-between items-start">
        <div className="skeleton w-32 h-8"></div> {/* Creator name */}
        <div className="skeleton w-6 h-6"></div> {/* Link icon */}
      </div>

      {/* Category */}
      <div className="skeleton mt-2 w-24 h-4"></div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Description - multiple lines */}
      <div className="flex flex-col gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-4"></div>
        <div className="skeleton w-1/2 h-4"></div>
      </div>

      {/* Image placeholder */}
      <div className="hidden relative mt-auto pt-6">
        <div className="skeleton w-full aspect-video"></div>
      </div>
    </div>
  )
}

export function CardsWait({ count = 6 }: { count?: number }) {
  return (
    <div className="gap-3 grid sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardWait key={index} />
      ))}
    </div>
  )
}
