import { GraduationCap, School } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import type { Profile } from "@/lib/types"

export function About({ profile }: { profile: Profile }) {
  const { education } = profile
  return (
    <section id="about" aria-label="About" className="container-max py-12">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <GlassCard className="h-full p-6 sm:p-8">
            <p className="eyebrow mb-4">About</p>
            <p className="text-lg leading-relaxed text-ink sm:text-xl">{profile.bio}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.08}>
          <GlassCard className="flex h-full flex-col gap-6 p-6 sm:p-8">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet/15 text-violet-soft">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <p className="font-display text-lg font-medium text-white">{education.institute}</p>
                <p className="text-sm text-dim">{education.degree} · {education.years}</p>
                <p className="mt-2 inline-flex items-baseline gap-1.5 text-sm text-dim">
                  CGPA <span className="font-display text-2xl font-semibold text-white">{education.cgpa}</span>/10
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pink/10 text-pink">
                <School className="size-5" />
              </span>
              <p className="text-sm text-dim">{education.school}</p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
