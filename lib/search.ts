import { hasDatabase, prisma } from "@/lib/prisma"
import type { Content, SearchResult, SearchType } from "@/lib/types"

/** Flattens all content into search entries with a link to where each item lives. */
export function buildIndex(content: Content): SearchResult[] {
  const { projects, experiences, pors, decks, sites, achievements, publications } = content
  return [
    ...projects.map((p) => ({
      id: p.id ?? `project:${p.slug}`,
      type: "project" as const,
      title: p.title,
      description: p.tagline,
      category: p.skills.join(", "),
      href: `/projects/${p.slug}`,
    })),
    ...experiences.map((e, i) => ({
      id: e.id ?? `experience:${i}`,
      type: "experience" as const,
      title: `${e.role} · ${e.company}`,
      description: e.description,
      category: e.skills.join(", "),
      href: "/#experience",
    })),
    ...pors.map((p, i) => ({
      id: p.id ?? `por:${i}`,
      type: "por" as const,
      title: `${p.position} · ${p.sphere}`,
      description: p.description,
      category: p.skills.join(", "),
      href: "/#leadership",
    })),
    ...decks.map((d) => ({
      id: d.id ?? `deck:${d.slug}`,
      type: "deck" as const,
      title: d.title,
      description: `${d.event}. ${d.summary}`,
      category: d.tags.join(", "),
      href: `/#deck-${d.slug}`,
    })),
    ...sites.map((s) => ({
      id: s.id ?? `site:${s.slug}`,
      type: "site" as const,
      title: s.name,
      description: s.description,
      category: s.stack.join(", "),
      href: s.url,
    })),
    ...achievements.map((a, i) => ({
      id: a.id ?? `achievement:${i}`,
      type: "achievement" as const,
      title: a.title,
      description: a.detail,
      category: a.tier,
      href: "/#achievements",
    })),
    ...publications.map((p, i) => ({
      id: p.id ?? `publication:${i}`,
      type: "publication" as const,
      title: p.title,
      description: `${p.authors} · ${p.venue}`,
      category: p.status,
      href: "/#research",
    })),
  ]
}

/**
 * Case-insensitive search over title/description/category. Uses the Postgres Search
 * table when content is served from the database, otherwise filters the static index.
 */
export async function search(content: Content, q: string, type?: SearchType): Promise<SearchResult[]> {
  const index = buildIndex(content)
  if (content.source === "database" && hasDatabase()) {
    const rows = await prisma.search.findMany({
      where: {
        ...(type ? { type } : {}),
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { id: "asc" },
    })
    const byId = new Map(index.map((r) => [r.id, r]))
    return rows.map((row) => byId.get(row.id)).filter((r): r is SearchResult => Boolean(r))
  }
  const needle = q.toLowerCase()
  return index.filter(
    (r) =>
      (!type || r.type === type) &&
      [r.title, r.description, r.category ?? ""].some((field) => field.toLowerCase().includes(needle)),
  )
}
