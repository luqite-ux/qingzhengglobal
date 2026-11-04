import type { CollaborationInput } from '@/lib/data/content'
import { Reveal } from '@/components/site/reveal'
import { Section } from '@/components/site/section'

export function Collaboration({ inputs }: { inputs: CollaborationInput[] }) {
  return (
    <Section id="collaboration" tone="paper" labelledBy="collaboration-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4 text-gold-deep">Collaboration</p>
            <h2
              id="collaboration-title"
              className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.5rem]"
            >
              What to prepare before you reach out
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Three inputs shape every project. Share what you have; a short description is enough to start the
              conversation.
            </p>
          </div>
        </Reveal>
        <ol className="border-b border-line lg:col-span-8">
          {inputs.map((input, index) => (
            <Reveal
              as="li"
              key={input.id}
              index={index}
              className="grid gap-4 border-t border-line py-8 sm:grid-cols-[4rem_1fr] md:grid-cols-[4rem_1fr_1fr] md:gap-8"
            >
              <span className="font-mono text-2xl text-gold-deep">{input.step}</span>
              <div>
                <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em]">{input.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{input.description}</p>
              </div>
              <ul className="grid gap-2 text-sm leading-relaxed sm:col-start-2 md:col-start-auto">
                {input.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
