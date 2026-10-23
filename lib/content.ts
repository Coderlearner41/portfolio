import { cache } from "react"
import { hasDatabase, prisma } from "@/lib/prisma"
import { staticContent } from "@/lib/static-content"
import type { Achievement, Content, Deck, Experience, Links, Project, Publication, Site } from "@/lib/types"

const byOrder = { orderBy: { order: "asc" as const } }

/**
 * Loads all portfolio content from Postgres. Falls back to the bundled data in /data
 * when no database is configured, it is unreachable, or it hasn't been seeded yet,
 * so the site always renders.
 */
export const getContent = cache(async (): Promise<Content> => {
  if (!hasDatabase()) return staticContent
  try {
    const [projects, experiences, pors, decks, sites, achievements, publications] = await Promise.all([
      prisma.project.findMany(byOrder),
      prisma.experience.findMany(byOrder),
      prisma.por.findMany(byOrder),
      prisma.deck.findMany(byOrder),
      prisma.site.findMany(byOrder),
      prisma.achievement.findMany(byOrder),
      prisma.publication.findMany(byOrder),
    ])
    if (projects.length === 0) return staticContent
    return {
      ...staticContent,
      projects: projects.map((p) => ({
        ...p,
        category: p.category as Project["category"],
        links: (p.links ?? {}) as Links,
      })),
      experiences: experiences.map((e) => ({ ...e, kind: e.kind as Experience["kind"] })),
      pors,
      decks: decks as Deck[],
      sites: sites.map((s) => ({ ...s, host: s.host as Site["host"] })),
      achievements: achievements.map((a) => ({ ...a, tier: a.tier as Achievement["tier"] })),
      publications: publications as Publication[],
      source: "database",
    }
  } catch (err) {
    console.error("[content] database unavailable, serving static content:", err)
    return staticContent
  }
})

export async function getProject(slug: string) {
  const { projects } = await getContent()
  return projects.find((p) => p.slug === slug) ?? null
}
