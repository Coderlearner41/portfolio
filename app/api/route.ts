import { NextResponse } from "next/server"
import { getContent } from "@/lib/content"
import { resources } from "@/lib/resources"

// GET /api: self-describing index of the Me-API.
export async function GET() {
  const { source } = await getContent()
  return NextResponse.json({
    name: "Dhawal Khatri · Me-API",
    source,
    endpoints: {
      "GET /api/profile": "Profile, contact links and skills",
      "GET /api/search?q=&type=": "Full-text search across all content",
      ...Object.fromEntries(
        Object.entries(resources).flatMap(([name, r]) => [
          [`GET /api/${name}`, r.skillField ? `List ${name} (filter with ?skill=)` : `List ${name}`],
          [`GET /api/${name}/:id`, `One ${r.type} by id (database mode)`],
        ]),
      ),
      "POST | PUT | DELETE /api/:resource[/:id]": "Write endpoints, require Authorization: Bearer <API_KEY>",
    },
  })
}
