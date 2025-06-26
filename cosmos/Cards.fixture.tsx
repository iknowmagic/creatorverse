import { creators } from '../app/data/creators'
import { Card } from '../app/pages/homepage/Card'

function Gallery() {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
      {creators.map(creator => (
        <Card key={creator.id} creator={creator} />
      ))}
    </div>
  )
}

export default {
  Gallery: <Gallery />
}
