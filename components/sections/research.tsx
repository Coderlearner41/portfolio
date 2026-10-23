import { FileText } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { Publication } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ResearchSection({ publications }: { publications: Publication[] }) {
  return (
    <Section
      id="research"
      index="05"
      eyebrow="Research & writing"
      title="Papers and reports"
      intro="Earthquake engineering meets software, plus applied economics."
    >
      <ul className="space-y-4">
        {publications.map((pub, i) => (
          <li key={pub.title}>
            <Reveal delay={i * 0.05}>
              <GlassCard className="flex gap-4 p-5 sm:p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-violet-soft">
                  <FileText className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "chip",
                        pub.status === "Under review" && "border-amber-300/30 bg-amber-300/10 text-amber-100",
                      )}
                    >
                      {pub.status}
                    </span>
                    <span className="font-mono text-xs text-faint">{pub.year}</span>
                  </div>
                  <h3 className="mt-2 text-base font-medium leading-snug text-white sm:text-lg">{pub.title}</h3>
                  <p className="mt-1 text-sm text-dim">{pub.authors}</p>
                  <p className="text-sm italic text-violet-soft/90">{pub.venue}</p>
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
