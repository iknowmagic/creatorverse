import { CreatorGallery } from '../app/layouts/advanced/CreatorGallery'
import { creators } from '../app/data/creators'

export default function CreatorGalleryFixture() {
  return <CreatorGallery creators={creators} />
}
