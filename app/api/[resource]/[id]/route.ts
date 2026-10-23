import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { hasDatabase, prisma } from "@/lib/prisma"
import { delegate, parseBody, resources, type Resource } from "@/lib/resources"

type Params = { params: Promise<{ resource: string; id: string }> }

async function resolve(params: Params["params"]) {
  const { resource: name, id: rawId } = await params
  const resource: Resource | undefined = resources[name]
  if (!resource) return { error: NextResponse.json({ message: `Unknown resource '${name}'` }, { status: 404 }) }
  const id = Number.parseInt(rawId, 10)
  if (!Number.isInteger(id)) return { error: NextResponse.json({ message: "id must be an integer" }, { status: 400 }) }
  if (!hasDatabase()) return { error: NextResponse.json({ message: "Database not configured" }, { status: 503 }) }
  return { resource, id }
}

function guard(request: Request) {
  return isAuthorized(request) ? null : NextResponse.json({ message: "Unauthorized" }, { status: 401 })
}

// GET /api/:resource/:id
export async function GET(_request: Request, { params }: Params) {
  const r = await resolve(params)
  if ("error" in r) return r.error
  const item = await delegate(prisma, r.resource.model).findUnique({ where: { id: r.id } })
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

// PUT /api/:resource/:id (Bearer API_KEY): partial update; keeps the Search row in sync.
export async function PUT(request: Request, { params }: Params) {
  const denied = guard(request)
  if (denied) return denied
  const r = await resolve(params)
  if ("error" in r) return r.error

  const parsed = parseBody(r.resource, await request.json().catch(() => null), true)
  if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 })

  const model = delegate(prisma, r.resource.model)
  const existing = await model.findUnique({ where: { id: r.id } })
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 })

  const updated = await prisma.$transaction(async (tx) => {
    const item = await delegate(tx, r.resource.model).update({ where: { id: r.id }, data: parsed.data })
    await tx.search.update({ where: { id: r.id }, data: r.resource.toSearch(item) })
    return item
  })
  revalidatePath("/", "layout")
  return NextResponse.json(updated)
}

// DELETE /api/:resource/:id (Bearer API_KEY): deleting the Search row cascades to the record.
export async function DELETE(request: Request, { params }: Params) {
  const denied = guard(request)
  if (denied) return denied
  const r = await resolve(params)
  if ("error" in r) return r.error

  const existing = await delegate(prisma, r.resource.model).findUnique({ where: { id: r.id } })
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 })
  await prisma.search.delete({ where: { id: r.id } })
  revalidatePath("/", "layout")
  return NextResponse.json({ message: "Deleted" })
}
