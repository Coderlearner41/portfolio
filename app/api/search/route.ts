import { NextResponse } from "next/server"
import { getContent } from "@/lib/content"
import { search } from "@/lib/search"
import type { SearchType } from "@/lib/types"

const TYPES: SearchType[] = ["project", "experience", "por", "deck", "site", "achievement", "publication"]

// GET /api/search?q=keyword&type=project|experience|por|deck|site|achievement|publication
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim()
  const type = searchParams.get("type")?.toLowerCase() as SearchType | undefined

  if (!q) return NextResponse.json({ message: "Query param 'q' is required" }, { status: 400 })
  if (type && !TYPES.includes(type)) {
    return NextResponse.json({ message: `type must be one of: ${TYPES.join(", ")}` }, { status: 400 })
  }
  return NextResponse.json(await search(await getContent(), q, type))
}
