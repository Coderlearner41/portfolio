import { NextResponse } from "next/server"
import { getContent } from "@/lib/content"

// GET /api/profile
export async function GET() {
  const { profile, skills } = await getContent()
  return NextResponse.json({ ...profile, skills })
}
