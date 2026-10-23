import { ArrowLeft, ArrowRight, ExternalLink, Presentation, Trophy } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaGithub } from "react-icons/fa6"
import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { projectsData } from "@/data/projects"
import { getContent, getProject } from "@/lib/content"

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug)
  if (!project) return {}
  return { title: project.title, description: project.tagline }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const { projects } = await getContent()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const { links } = project

  return (
    <article className="container-max max-w-4xl pb-24 pt-32 sm:pt-40">
      <Reveal>
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-dim hover:text-ink">
          <ArrowLeft className="size-4" /> All projects
        </Link>
        <p className="eyebrow mt-8">
          {project.category} · {project.date}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-6xl">{project.title}</h1>
        <p className="mt-4 text-lg text-dim sm:text-xl">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet/30 to-pink/25 px-3 py-1 text-sm font-medium text-white">
              <Trophy className="size-4" /> {project.badge}
            </span>
          )}
          {project.role && <span className="chip text-sm">{project.role}</span>}
        </div>
        {(links.demo || links.github || links.deck) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink className="size-4" /> Live demo
              </a>
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FaGithub className="size-4" /> Source
              </a>
            )}
            {links.deck && (
              <Link href={`/#deck-${links.deck}`} className="btn btn-ghost">
                <Presentation className="size-4" /> View deck
              </Link>
            )}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.08}>
        <GlassCard className="mt-12 p-6 sm:p-8">
          <h2 className="eyebrow mb-4">Overview</h2>
          <p className="text-base leading-relaxed text-ink sm:text-lg">{project.description}</p>
        </GlassCard>
      </Reveal>

      {project.highlights.length > 0 && (
        <Reveal delay={0.12}>
          <GlassCard className="mt-4 p-6 sm:p-8">
            <h2 className="eyebrow mb-4">Highlights</h2>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-pink" />
                  {h}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      )}

      <Reveal delay={0.16}>
        <GlassCard className="mt-4 p-6 sm:p-8">
          <h2 className="eyebrow mb-4">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <li key={s} className="chip text-sm text-ink">{s}</li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <nav aria-label="More projects" className="mt-12 grid gap-4 sm:grid-cols-2">
        <GlassCard as={Link} href={`/projects/${prev.slug}`} className="group p-5">
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <p className="mt-1 font-medium text-white group-hover:text-violet-soft">{prev.title}</p>
        </GlassCard>
        <GlassCard as={Link} href={`/projects/${next.slug}`} className="group p-5 text-right">
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            Next <ArrowRight className="size-3.5" />
          </span>
          <p className="mt-1 font-medium text-white group-hover:text-violet-soft">{next.title}</p>
        </GlassCard>
      </nav>
    </article>
  )
}
