import type { Prisma } from "@prisma/client"
import type { SearchType } from "@/lib/types"

type FieldKind = "string" | "string?" | "string[]" | "number" | "boolean" | "json"

// Minimal shape shared by every Prisma model delegate used here.
type Delegate = {
  findMany(args?: unknown): Promise<Record<string, unknown>[]>
  findUnique(args: unknown): Promise<Record<string, unknown> | null>
  create(args: unknown): Promise<Record<string, unknown>>
  update(args: unknown): Promise<Record<string, unknown>>
  delete(args: unknown): Promise<Record<string, unknown>>
}

export type Resource = {
  type: SearchType
  model: "project" | "experience" | "por" | "deck" | "site" | "achievement" | "publication"
  fields: Record<string, FieldKind>
  required: string[]
  // How a record is represented in the Search index.
  toSearch: (data: Record<string, unknown>) => { title: string; description: string; category: string | null }
  // Array field that ?skill= filters on, if any.
  skillField?: string
}

const join = (v: unknown) => (Array.isArray(v) ? v.join(", ") : null)
const str = (v: unknown) => (typeof v === "string" ? v : "")

export const resources: Record<string, Resource> = {
  projects: {
    type: "project",
    model: "project",
    fields: {
      slug: "string", title: "string", tagline: "string", description: "string", category: "string",
      badge: "string?", date: "string", role: "string?", skills: "string[]", highlights: "string[]",
      links: "json", featured: "boolean", order: "number",
    },
    required: ["slug", "title", "tagline", "description", "category", "date"],
    toSearch: (d) => ({ title: str(d.title), description: `${str(d.tagline)} ${str(d.description)}`, category: join(d.skills) }),
    skillField: "skills",
  },
  experiences: {
    type: "experience",
    model: "experience",
    fields: {
      company: "string", role: "string", duration: "string", kind: "string", location: "string?",
      description: "string", highlights: "string[]", skills: "string[]", order: "number",
    },
    required: ["company", "role", "duration", "kind", "description"],
    toSearch: (d) => ({ title: `${str(d.role)} · ${str(d.company)}`, description: str(d.description), category: join(d.skills) }),
    skillField: "skills",
  },
  pors: {
    type: "por",
    model: "por",
    fields: {
      sphere: "string", position: "string", tenure: "string", description: "string",
      highlights: "string[]", skills: "string[]", order: "number",
    },
    required: ["sphere", "position", "tenure", "description"],
    toSearch: (d) => ({ title: `${str(d.position)} · ${str(d.sphere)}`, description: str(d.description), category: join(d.skills) }),
    skillField: "skills",
  },
  decks: {
    type: "deck",
    model: "deck",
    fields: {
      slug: "string", title: "string", event: "string", summary: "string", role: "string", date: "string",
      pages: "number", ratio: "number", tags: "string[]", order: "number",
    },
    required: ["slug", "title", "event", "summary", "role", "date", "pages", "ratio"],
    toSearch: (d) => ({ title: str(d.title), description: `${str(d.event)}. ${str(d.summary)}`, category: join(d.tags) }),
    skillField: "tags",
  },
  sites: {
    type: "site",
    model: "site",
    fields: {
      slug: "string", name: "string", url: "string", repo: "string?", description: "string",
      stack: "string[]", host: "string", order: "number",
    },
    required: ["slug", "name", "url", "description", "host"],
    toSearch: (d) => ({ title: str(d.name), description: str(d.description), category: join(d.stack) }),
    skillField: "stack",
  },
  achievements: {
    type: "achievement",
    model: "achievement",
    fields: { title: "string", detail: "string", year: "string", tier: "string", order: "number" },
    required: ["title", "detail", "tier"],
    toSearch: (d) => ({ title: str(d.title), description: str(d.detail), category: str(d.tier) }),
  },
  publications: {
    type: "publication",
    model: "publication",
    fields: { title: "string", authors: "string", venue: "string", status: "string", year: "string", order: "number" },
    required: ["title", "authors", "venue", "status", "year"],
    toSearch: (d) => ({ title: str(d.title), description: `${str(d.authors)} · ${str(d.venue)}`, category: str(d.status) }),
  },
}

export function delegate(client: Prisma.TransactionClient | object, model: Resource["model"]): Delegate {
  return (client as unknown as Record<string, Delegate>)[model]
}

const valid: Record<FieldKind, (v: unknown) => boolean> = {
  string: (v) => typeof v === "string",
  "string?": (v) => v === null || typeof v === "string",
  "string[]": (v) => Array.isArray(v) && v.every((x) => typeof x === "string"),
  number: (v) => typeof v === "number" && Number.isFinite(v),
  boolean: (v) => typeof v === "boolean",
  json: (v) => typeof v === "object" && v !== null && !Array.isArray(v),
}

/** Keeps only known, correctly-typed fields. `partial` skips the required check (for PUT). */
export function parseBody(resource: Resource, body: unknown, partial = false) {
  if (typeof body !== "object" || body === null) return { error: "Body must be a JSON object" } as const
  const input = body as Record<string, unknown>
  const data: Record<string, unknown> = {}
  for (const [key, kind] of Object.entries(resource.fields)) {
    if (!(key in input)) continue
    if (!valid[kind](input[key])) return { error: `Field '${key}' must be ${kind}` } as const
    data[key] = input[key]
  }
  if (!partial) {
    const missing = resource.required.filter((k) => !(k in data))
    if (missing.length) return { error: `Missing required field(s): ${missing.join(", ")}` } as const
  }
  return { data } as const
}
