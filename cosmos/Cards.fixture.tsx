import { ExternalLink, Link } from 'lucide-react'
import { creators } from '../app/data/creators'
import type { Creator } from '../app/data/creators'
import { Card } from '../app/layouts/basic/Card'

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
