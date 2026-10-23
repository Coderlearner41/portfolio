import { PrismaClient } from "@prisma/client"
import { staticContent } from "../lib/static-content"
import { delegate, resources } from "../lib/resources"

const prisma = new PrismaClient()

// Rebuilds the database from /data so the bundled content stays the single source of truth.
// With --if-empty (used by the Vercel build) it only seeds a fresh database, so edits made
// through the API survive redeploys.
async function main() {
  if (process.argv.includes("--if-empty") && (await prisma.search.count()) > 0) {
    console.log("database already seeded, skipping")
    return
  }
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Search" RESTART IDENTITY CASCADE`)

  for (const [name, resource] of Object.entries(resources)) {
    const items = staticContent[name as keyof typeof resources & keyof typeof staticContent] as unknown as Record<string, unknown>[]
    for (const item of items) {
      const data = Object.fromEntries(Object.keys(resource.fields).filter((k) => k in item).map((k) => [k, item[k]]))
      const search = await prisma.search.create({ data: { type: resource.type, ...resource.toSearch(data) } })
      await delegate(prisma, resource.model).create({ data: { id: search.id, ...data } })
    }
    console.log(`seeded ${items.length} ${name}`)
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
