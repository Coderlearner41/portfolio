import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { getContent } from "@/lib/content"
import { hasDatabase, prisma } from "@/lib/prisma"
import { delegate, parseBody, resources } from "@/lib/resources"
import type { Content } from "@/lib/types"

type Params = { params: Promise<{ resource: string }> }

const contentKey: Record<string, keyof Content> = {
  projects: "projects",
  experiences: "experiences",
  pors: "pors",
  decks: "decks",
  sites: "sites",
  achievements: "achievements",
  publications: "publications",
}

// GET /api/:resource?skill=React&category=Research&featured=true
export async function GET(request: Request, { params }: Params) {
  const { resource: name } = await params
  const resource = resources[name]
  if (!resource) return NextResponse.json({ message: `Unknown resource '${name}'` }, { status: 404 })

  const { searchParams } = new URL(request.url)
  const skill = searchParams.get("skill")?.toLowerCase()
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")

  let items = (await getContent())[contentKey[name]] as Record<string, unknown>[]
  if (skill && resource.skillField) {
    items = items.filter((item) =>
      (item[resource.skillField!] as string[]).some((s) => s.toLowerCase() === skill),
    )
  }
  if (category) items = items.filter((item) => item.category === category)
  if (featured) items = items.filter((item) => item.featured === (featured === "true"))

  return NextResponse.json(items)
}

// POST /api/:resource (Bearer API_KEY): creates the Search row and the record with the same id.
export async function POST(request: Request, { params }: Params) {
  const { resource: name } = await params
  const resource = resources[name]
  if (!resource) return NextResponse.json({ message: `Unknown resource '${name}'` }, { status: 404 })
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  if (!hasDatabase()) return NextResponse.json({ message: "Database not configured" }, { status: 503 })

  const parsed = parseBody(resource, await request.json().catch(() => null))
  if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 })

  const created = await prisma.$transaction(async (tx) => {
    const search = await tx.search.create({ data: { type: resource.type, ...resource.toSearch(parsed.data) } })
    return delegate(tx, resource.model).create({ data: { id: search.id, ...parsed.data } })
  })
  revalidatePath("/", "layout")
  return NextResponse.json(created, { status: 201 })
}
