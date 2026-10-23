import type { Metadata } from "next"
import { Playground } from "@/components/playground"
import { getContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Me-API Playground",
  description: "Query the JSON API behind this portfolio: profile, projects, experience, decks, sites and search.",
}

export default async function PlaygroundPage() {
  const { source } = await getContent()
  return (
    <div className="container-max max-w-5xl pb-24 pt-32 sm:pt-40">
      <p className="eyebrow">Me-API</p>
      <h1 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">
        API <span className="text-gradient">playground</span>
      </h1>
      <p className="mt-4 max-w-2xl text-dim">
        Everything on this site is served by a small REST API over Postgres, the original Predusk “Me-API” project, now
        living inside this Next.js app. Pick an endpoint and send a request.
      </p>
      <p className="mt-3 font-mono text-xs text-faint">
        data source: <span className={source === "database" ? "text-emerald-300" : "text-amber-200"}>{source}</span>
      </p>
      <Playground />
    </div>
  )
}
