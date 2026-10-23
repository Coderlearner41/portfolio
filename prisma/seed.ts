import { createHash } from "node:crypto"
import { PrismaClient } from "@prisma/client"
import { staticContent } from "../lib/static-content"
import { delegate, resources } from "../lib/resources"

const prisma = new PrismaClient()

// Rebuilds the database from /data so the bundled content stays the single source of truth.
// With --if-changed (used by the Vercel build) it only reseeds when /data differs from the last
// seed, so edits made through the API survive redeploys that don't touch content.
async function main() {
  const hash = createHash("sha256").update(JSON.stringify(staticContent)).digest("hex")
  if (process.argv.includes("--if-changed")) {
    const last = await prisma.meta.findUnique({ where: { key: "content-hash" } })
    if (last?.value === hash) {
      console.log("content unchanged since last seed, skipping")
      return
    }
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
  await prisma.meta.upsert({
    where: { key: "content-hash" },
    create: { key: "content-hash", value: hash },
    update: { value: hash },
  })
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
