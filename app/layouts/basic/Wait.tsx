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
    <div className="flex gap-2 w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <CategoryWait key={index} />
      ))}
    </div>
  )
}
