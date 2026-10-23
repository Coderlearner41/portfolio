import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { Por } from "@/lib/types"

export function LeadershipSection({ pors }: { pors: Por[] }) {
  const [lead, ...rest] = pors
  return (
    <Section
      id="leadership"
      index="06"
      eyebrow="Leadership"
      title="Beyond the code"
      intro="Running a 60-person club, auditing student funds and building tools for the placement cell."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {lead && (
          <Reveal className="lg:row-span-2">
            <GlassCard className="h-full bg-gradient-to-br from-violet/[0.12] to-pink/[0.06] p-6 sm:p-8">
              <p className="font-mono text-xs text-faint">{lead.tenure}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{lead.position}</h3>
              <p className="text-violet-soft">{lead.sphere}</p>
              <p className="mt-4 text-dim">{lead.description}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink/90">
                {lead.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-pink" />
                    {h}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        )}
        {rest.map((por, i) => (
          <Reveal key={`${por.sphere}-${por.position}`} delay={Math.min(i * 0.04, 0.2)}>
            <GlassCard className="h-full p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium text-white">{por.position}</h3>
                <span className="shrink-0 font-mono text-xs text-faint">{por.tenure}</span>
              </div>
              <p className="text-sm text-violet-soft">{por.sphere}</p>
              <p className="mt-2 text-sm text-dim">{por.description}</p>
              {por.highlights.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-ink/80">
                  {por.highlights.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
