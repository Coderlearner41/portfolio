import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { Experience } from "@/lib/types"

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <Section
      id="experience"
      index="01"
      eyebrow="Experience"
      title="Where I've shipped"
      intro="Internships and freelance builds, from a government mental-health app to production AI pipelines."
    >
      <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-gradient-to-b before:from-violet/60 before:via-line before:to-transparent sm:space-y-5">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${exp.role}`} className="relative pl-10">
            <span
              aria-hidden
              className="absolute left-0 top-6 grid size-6 place-items-center rounded-full border border-violet/40 bg-[#0d0d14]"
            >
              <span className="size-2 rounded-full bg-gradient-to-br from-violet to-pink" />
            </span>
            <Reveal delay={Math.min(i * 0.04, 0.2)}>
              <GlassCard className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-lg font-medium text-white sm:text-xl">{exp.role}</h3>
                    <p className="text-sm text-violet-soft">
                      {exp.company}
                      {exp.location && <span className="text-faint"> · {exp.location}</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="chip">{exp.kind}</span>
                    <span className="font-mono text-xs text-faint">{exp.duration}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dim sm:text-base">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-ink/90">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-pink" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {exp.skills.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
