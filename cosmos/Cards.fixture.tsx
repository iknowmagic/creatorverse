import { ArchiveBlockCard } from '~/layouts/advanced/ArchiveBlockCard'
import { FrameCard } from '~/layouts/advanced/FrameCard'
import { MonumentCard } from '~/layouts/advanced/MonumentCard'
import { SplitCard } from '~/layouts/advanced/SplitCard'
import { StatementCard } from '~/layouts/advanced/StatementCard'
import { creators } from '~/data/creators'

// Get a few different creators for variety
const sampleCreators = creators.slice(0, 2)

export default (
  <div className="space-y-12 bg-gray-50 p-6 dark:bg-gray-950">
    {/* ArchiveBlockCard */}
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Archive Block Card
      </h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {sampleCreators.map(creator => (
          <div key={`archive-${creator.id}`} className="h-[400px] w-full">
            <ArchiveBlockCard creator={creator} />
          </div>
        ))}
      </div>
    </section>

    {/* FrameCard */}
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Frame Card</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <FrameCard key={`frame-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* MonumentCard */}
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Monument Card</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <MonumentCard key={`monument-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* SplitCard */}
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Split Card</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <SplitCard key={`split-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* StatementCard */}
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Statement Card</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <StatementCard key={`statement-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>
  </div>
)
