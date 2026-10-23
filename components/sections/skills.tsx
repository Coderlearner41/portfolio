import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { SkillGroup } from "@/lib/types"

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  const all = skills.flatMap((g) => g.items)
  return (
    <Section id="skills" index="08" eyebrow="Toolbox" title="What I work with">
      {/* Decorative marquee; the grouped list below carries the content. */}
      <div
        aria-hidden
        className="relative -mx-4 mb-8 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] sm:mx-0"
      >
        <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="whitespace-nowrap font-display text-2xl text-white/15 sm:text-4xl">
              {s} <span className="text-violet/40">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05}>
            <GlassCard className="h-full p-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-violet-soft">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <li key={s} className="chip text-ink/90">{s}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
