import { Award, BadgeCheck, Medal, Trophy } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { Achievement } from "@/lib/types"

const TIER = {
  gold: { icon: Trophy, ring: "from-amber-300 to-yellow-600", text: "text-amber-200" },
  silver: { icon: Medal, ring: "from-slate-200 to-slate-500", text: "text-slate-200" },
  bronze: { icon: Medal, ring: "from-orange-300 to-amber-800", text: "text-orange-200" },
  award: { icon: Award, ring: "from-violet to-pink", text: "text-violet-soft" },
  cert: { icon: BadgeCheck, ring: "from-cyan to-violet", text: "text-cyan" },
} as const

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <Section id="achievements" index="07" eyebrow="Achievements" title="Podiums and milestones">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {achievements.map((a, i) => {
          const tier = TIER[a.tier]
          return (
            <li key={a.title}>
              <Reveal delay={Math.min(i * 0.03, 0.25)} className="h-full">
                <GlassCard className="flex h-full flex-col p-5">
                  <span className={`grid size-10 place-items-center rounded-full bg-gradient-to-br p-[1.5px] ${tier.ring}`}>
                    <span className="grid size-full place-items-center rounded-full bg-[#0d0d14]">
                      <tier.icon className={`size-4.5 ${tier.text}`} />
                    </span>
                  </span>
                  <p className="mt-4 font-display text-lg font-medium leading-tight text-white">{a.title}</p>
                  <p className="mt-1 text-sm text-dim">{a.detail}</p>
                  {a.year && <p className="mt-auto pt-3 font-mono text-xs text-faint">{a.year}</p>}
                </GlassCard>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
