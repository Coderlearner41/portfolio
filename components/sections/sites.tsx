"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { FaGithub } from "react-icons/fa6"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import type { Site } from "@/lib/types"
import { cn } from "@/lib/utils"

// Shown at double width on large screens; with dense packing this keeps the grid free of gaps.
const WIDE = new Set(["building-analyser"])

export function SitesSection({ sites }: { sites: Site[] }) {
  return (
    <Section
      id="sites"
      index="03"
      eyebrow="Live websites"
      title="Deployed and clickable"
      intro="Every one of these is live right now. Hover to preview, click to open."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3">
        {sites.map((site, i) => (
          <li key={site.slug} className={cn("min-w-0", WIDE.has(site.slug) && "lg:col-span-2")}>
            <Reveal delay={Math.min(i * 0.04, 0.24)} className="h-full">
              <SiteCard site={site} wide={WIDE.has(site.slug)} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function SiteCard({ site, wide }: { site: Site; wide: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const host = site.url.replace(/^https?:\/\//, "")

  const tilt = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`
  }

  return (
    <div
      ref={ref}
      onPointerMove={tilt}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
      className="glass group flex h-full flex-col overflow-hidden transition-transform duration-200 ease-out will-change-transform"
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/30 px-2 py-0.5 font-mono text-[11px] text-dim">
          <span
            className={`size-1.5 shrink-0 rounded-full ${site.host === "Render" ? "bg-amber-400" : "bg-emerald-400"}`}
            title={site.host === "Render" ? "Live · free tier, may take ~30 s to wake" : "Live"}
          />
          <span className="truncate">{host}</span>
        </span>
      </div>
      <a href={site.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open ${site.name}`}>
        <div className={cn("relative overflow-hidden", wide ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[16/10]")}>
          <Image
            src={`/sites/${site.slug}.webp`}
            alt={`Screenshot of ${site.name}`}
            fill
            sizes={wide ? "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 760px" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-80" />
          <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-white">{site.name}</h3>
          {site.repo && (
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} source on GitHub`}
              className="text-faint transition-colors hover:text-white"
            >
              <FaGithub className="size-4" />
            </a>
          )}
        </div>
        <p className="mt-1.5 text-sm text-dim">{site.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {site.stack.map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
          <li className="chip ml-auto border-transparent bg-transparent px-0 font-mono text-[10px] uppercase tracking-widest text-faint">
            {site.host}
          </li>
        </ul>
      </div>
    </div>
  )
}
