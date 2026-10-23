"use client"

import { Loader2, Play } from "lucide-react"
import { useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { cn } from "@/lib/utils"

const ENDPOINTS = [
  { path: "/api", note: "index" },
  { path: "/api/profile", note: "profile + skills" },
  { path: "/api/projects", note: "all projects" },
  { path: "/api/projects?skill=Flutter", note: "filter by skill" },
  { path: "/api/projects?category=Research", note: "filter by category" },
  { path: "/api/experiences", note: "experience" },
  { path: "/api/pors", note: "positions of responsibility" },
  { path: "/api/decks", note: "decks" },
  { path: "/api/sites", note: "live websites" },
  { path: "/api/achievements", note: "achievements" },
  { path: "/api/publications", note: "publications" },
  { path: "/api/search?q=seismic", note: "full-text search" },
]

export function Playground() {
  const [path, setPath] = useState(ENDPOINTS[0].path)
  const [result, setResult] = useState<{ status: number; ms: number; body: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const send = async (target = path) => {
    setPath(target)
    setLoading(true)
    const started = performance.now()
    try {
      const res = await fetch(target)
      const text = await res.text()
      let body = text
      try {
        body = JSON.stringify(JSON.parse(text), null, 2)
      } catch {}
      setResult({ status: res.status, ms: Math.round(performance.now() - started), body })
    } catch (err) {
      setResult({ status: 0, ms: 0, body: String(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[280px_1fr]">
      <GlassCard className="h-fit p-2" spotlight={false}>
        <ul className="space-y-0.5">
          {ENDPOINTS.map((e) => (
            <li key={e.path}>
              <button
                type="button"
                onClick={() => send(e.path)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left transition-colors",
                  path === e.path ? "bg-violet/20 text-white" : "text-dim hover:bg-white/5 hover:text-ink",
                )}
              >
                <span className="block truncate font-mono text-xs">
                  <span className="text-emerald-300">GET</span> {e.path}
                </span>
                <span className="text-[11px] text-faint">{e.note}</span>
              </button>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="min-w-0 p-4" spotlight={false}>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-black/30 px-4 font-mono text-sm">
            <span className="text-emerald-300">GET</span>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              aria-label="Request path"
              className="min-w-0 flex-1 bg-transparent py-2 text-ink outline-none"
              spellCheck={false}
            />
          </label>
          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />} Send
          </button>
        </form>
        <div className="mt-3 flex items-center gap-3 font-mono text-xs text-faint">
          {result ? (
            <>
              <span className={result.status >= 200 && result.status < 300 ? "text-emerald-300" : "text-pink"}>
                {result.status || "ERR"}
              </span>
              <span>{result.ms} ms</span>
            </>
          ) : (
            <span>Pick an endpoint or type a path, then press Send.</span>
          )}
        </div>
        <pre className="mt-3 max-h-[60vh] overflow-auto rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed text-ink/90">
          {result?.body ?? "// response appears here"}
        </pre>
        <p className="mt-3 text-xs text-faint">
          Writes (<code>POST</code>, <code>PUT</code>, <code>DELETE</code>) need <code>Authorization: Bearer &lt;API_KEY&gt;</code>.
        </p>
      </GlassCard>
    </div>
  )
}
