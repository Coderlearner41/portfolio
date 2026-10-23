"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Trophy } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { Section } from "@/components/section"
import type { Project, ProjectCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

const CATEGORIES: ("All" | ProjectCategory)[] = ["All", "Research", "Competition", "AI / ML", "Product"]

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All")
  const [skill, setSkill] = useState<string | null>(null)

  // Skills used by at least two projects, most common first.
  const topSkills = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of projects) for (const s of p.skills) counts.set(s, (counts.get(s) ?? 0) + 1)
    return [...counts].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([s]) => s).slice(0, 10)
  }, [projects])

  const visible = projects.filter(
    (p) => (category === "All" || p.category === category) && (!skill || p.skills.includes(skill)),
  )
  const filtered = category !== "All" || skill !== null

  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Projects"
      title={
        <>
          Things I&apos;ve <span className="text-gradient">built</span>
        </>
      }
      intro="Research, competition podiums, ML experiments and products. Open any card for the full story."
    >
      <div className="mb-8 flex flex-col gap-3">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                category === c
                  ? "border-violet/60 bg-violet/20 text-white"
                  : "border-line bg-white/[0.03] text-dim hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Filter by skill">
          <span className="mr-1 font-mono text-xs uppercase tracking-widest text-faint">Skill</span>
          {topSkills.map((s) => (
            <button
              key={s}
              aria-pressed={skill === s}
              onClick={() => setSkill(skill === s ? null : s)}
              className={cn(
                "chip transition-colors",
                skill === s ? "border-pink/50 bg-pink/15 text-white" : "hover:text-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => {
            // Unfiltered view leads with the two flagship projects at double width.
            const big = !filtered && project.featured && i < 2
            return (
              <motion.li
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={cn("min-w-0", big ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <ProjectCard project={project} large={big} />
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && <p className="text-dim">No projects match that filter.</p>}
    </Section>
  )
}

function ProjectCard({ project, large }: { project: Project; large: boolean }) {
  return (
    <GlassCard
      as={Link}
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-faint">
          {project.category} · {project.date}
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <h3 className={cn("mt-3 font-medium text-white", large ? "text-2xl sm:text-3xl" : "text-xl")}>{project.title}</h3>
      {project.badge && (
        <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-violet/25 to-pink/20 px-2.5 py-1 text-xs font-medium text-white">
          <Trophy className="size-3.5" /> {project.badge}
        </p>
      )}
      <p className={cn("mt-3 text-dim", large ? "text-base" : "text-sm")}>{project.tagline}</p>
      {large && project.highlights[0] && (
        <p className="mt-3 border-l-2 border-violet/50 pl-3 text-sm text-ink/80">{project.highlights[0]}</p>
      )}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.skills.slice(0, large ? 6 : 4).map((s) => (
          <li key={s} className="chip">{s}</li>
        ))}
      </ul>
    </GlassCard>
  )
}
