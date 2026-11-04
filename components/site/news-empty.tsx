import { Newspaper } from 'lucide-react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { CtaLink } from '@/components/site/cta-link'

export function NewsEmpty({ compact = false }: { compact?: boolean }) {
  return (
    <Empty className="rounded-md border border-dashed border-ink/30 bg-white text-ink">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-paper-2 text-ink">
          <Newspaper aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="text-ink">No news has been published yet</EmptyTitle>
        <EmptyDescription className="text-ink-muted">
          Published company news will appear here. For questions about a project, contact the team directly.
        </EmptyDescription>
      </EmptyHeader>
      {compact ? null : (
        <EmptyContent>
          <CtaLink href="/contact" variant="dark">
            Contact
          </CtaLink>
        </EmptyContent>
      )}
    </Empty>
  )
}
