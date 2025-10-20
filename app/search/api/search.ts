const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://predusk-backend-production.up.railway.app"

export type SearchResult = {
  id: number
  type: "project" | "skill" | "por" | "experience" | "profile"
  title: string
  description: string
  category?: string
}

// Search across all endpoints
export async function search(query: string, activeTypes: string[]): Promise<SearchResult[]> {
  if (!query) return []

  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error("Search failed")
  return res.json()
}
