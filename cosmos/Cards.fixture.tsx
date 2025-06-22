import { ArchiveBlockCard } from '~/layouts/advanced/ArchiveBlockCard'
import { FrameCard } from '~/layouts/advanced/FrameCard'
import { MonumentCard } from '~/layouts/advanced/MonumentCard'
import { SplitCard } from '~/layouts/advanced/SplitCard'
import { StatementCard } from '~/layouts/advanced/StatementCard'
import { creators } from '~/data/creators'
import { CardLink } from '~/layouts/advanced/CardLink'

// Get a few different creators for variety
const sampleCreators = creators.slice(0, 2)

export default (
  <div className="space-y-12 bg-gray-50 dark:bg-gray-950 p-6">
    {/* ArchiveBlockCard */}
    <section>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">
        Archive Block Card
      </h2>
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleCreators.map(creator => (
          <div key={`archive-${creator.id}`} className="w-full h-[400px]">
            <CardLink creator={creator}>
              <ArchiveBlockCard creator={creator} />
            </CardLink>
          </div>
        ))}
      </div>
    </section>

    {/* FrameCard */}
    <section>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">Frame Card</h2>
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <FrameCard key={`frame-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* MonumentCard */}
    <section>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">Monument Card</h2>
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <MonumentCard key={`monument-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* SplitCard */}
    <section>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">Split Card</h2>
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <SplitCard key={`split-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>

    {/* StatementCard */}
    <section>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">Statement Card</h2>
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleCreators.map(creator => (
          <StatementCard key={`statement-${creator.id}`} creator={creator} />
        ))}
      </div>
    </section>
  </div>
)
