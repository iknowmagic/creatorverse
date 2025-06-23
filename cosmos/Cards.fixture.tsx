import { randomCreators } from '~/data/creators'
import type { Creator } from '~/data/creators'
import {
  CardType1,
  CardType2,
  CardType3,
  CardImage1,
  CardImage2,
  CardImage3
} from '~/layouts/advanced/CreatorGallery'

// Get a few different creators for variety
const sampleCreators = randomCreators().slice(0, 6)

export default (
  <div className="space-y-12 bg-gray-50 dark:bg-gray-950 p-6 min-h-screen">
    {/* Text-based Cards - DaisyUI */}
    <section>
      <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl">
        Text-based Cards (DaisyUI)
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardType1 - Square Layout
          </h3>
          <div className="w-80">
            <CardType1 creator={sampleCreators[0]} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardType2 - Portrait with Description
          </h3>
          <div className="w-80">
            <CardType2 creator={sampleCreators[1]} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardType3 - Compact Description
          </h3>
          <div className="w-80">
            <CardType3 creator={sampleCreators[2]} />
          </div>
        </div>
      </div>
    </section>

    {/* Image-based Cards - DaisyUI */}
    <section>
      <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl">
        Image-based Cards (DaisyUI)
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardImage1 - Square with Large Image
          </h3>
          <div className="w-80">
            <CardImage1 creator={sampleCreators[3]} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardImage2 - Portrait with Small Image
          </h3>
          <div className="w-80">
            <CardImage2 creator={sampleCreators[4]} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-lg">
            CardImage3 - Landscape Format
          </h3>
          <div className="w-96 h-48">
            <CardImage3 creator={sampleCreators[5]} />
          </div>
        </div>
      </div>
    </section>

    {/* All Cards Grid */}
    <section>
      <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl">All Card Types</h2>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <CardType1 creator={sampleCreators[0]} />
        <CardType2 creator={sampleCreators[1]} />
        <CardType3 creator={sampleCreators[2]} />
        <CardImage1 creator={sampleCreators[3]} />
        <CardImage2 creator={sampleCreators[4]} />
        <div className="lg:col-span-2">
          <CardImage3 creator={sampleCreators[5]} />
        </div>
      </div>
    </section>

    {/* Mixed Layout */}
    <section>
      <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl">Mixed Layout</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <CardType1 creator={sampleCreators[0]} />
        <CardImage1 creator={sampleCreators[1]} />
        <CardType2 creator={sampleCreators[2]} />
        <CardImage2 creator={sampleCreators[3]} />
        <div className="lg:col-span-2">
          <CardImage3 creator={sampleCreators[4]} />
        </div>
        <CardType3 creator={sampleCreators[5]} />
      </div>
    </section>
  </div>
)
