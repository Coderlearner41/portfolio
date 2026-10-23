"use client"

import { ChevronLeft, ChevronRight, Download, Layers, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { Deck } from "@/lib/types"
import { cn } from "@/lib/utils"

const slide = (slug: string, n: number) => `/decks/${slug}/${String(n).padStart(2, "0")}.webp`

export function DecksSection({ decks }: { decks: Deck[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const deck = decks.find((d) => d.slug === openSlug) ?? null

  // Deep links: /#deck-<slug> opens that deck (used by the command menu and shareable URLs).
  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#deck-(.+)$/)
      if (match && decks.some((d) => d.slug === match[1])) setOpenSlug(match[1])
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [decks])

  const close = () => {
    setOpenSlug(null)
    if (window.location.hash.startsWith("#deck-")) history.replaceState(null, "", window.location.pathname + "#decks")
  }

  return (
    <Section
      id="decks"
      index="04"
      eyebrow="Decks"
      title="Pitches, cases and strategy"
      intro="Hackathon finals, case competitions, an election pitch and a valuation. Click any deck to flip through it here."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((d, i) => (
          <li key={d.slug} id={`deck-${d.slug}`} className="min-w-0 scroll-mt-28">
            <Reveal delay={Math.min(i * 0.05, 0.25)}>
              <GlassCard
                as="button"
                type="button"
                onClick={() => setOpenSlug(d.slug)}
                className="group block w-full overflow-hidden text-left"
                aria-label={`Open deck: ${d.title}`}
              >
                <div className="relative aspect-video overflow-hidden border-b border-line">
                  <Image
                    src={`/decks/${d.slug}/cover.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 font-mono text-xs text-white backdrop-blur-md">
                    <Layers className="size-3" /> {d.pages}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-violet-soft">{d.event}</p>
                  <h3 className="mt-2 text-lg font-medium leading-snug text-white">{d.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-dim">{d.summary}</p>
                  <p className="mt-4 text-xs text-faint">
                    {d.role} · {d.date}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Dialog open={deck !== null} onOpenChange={(o) => !o && close()}>
        {deck && <DeckViewer deck={deck} onClose={close} />}
      </Dialog>
    </Section>
  )
}

function DeckViewer({ deck, onClose }: { deck: Deck; onClose: () => void }) {
  const [page, setPage] = useState(1)
  const go = useCallback((delta: number) => setPage((p) => Math.min(deck.pages, Math.max(1, p + delta))), [deck.pages])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  return (
    <DialogContent
      showCloseButton={false}
      className="glass w-[min(96vw,1200px)] max-w-none border-line-strong bg-[#0d0d14] p-3 sm:max-w-none sm:p-4"
    >
      <div className="flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <DialogTitle className="truncate text-left font-display text-base font-medium text-white sm:text-lg">
            {deck.title}
          </DialogTitle>
          <DialogDescription className="text-left text-xs">{deck.event}</DialogDescription>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={`/decks/${deck.slug}/${deck.slug}.pdf`}
            download
            className="btn btn-ghost px-3 py-1.5 text-xs"
          >
            <Download className="size-3.5" /> PDF
          </a>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 place-items-center rounded-full text-dim hover:bg-white/10 hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-black" style={{ aspectRatio: deck.ratio }}>
        <Image
          key={page}
          src={slide(deck.slug, page)}
          alt={`${deck.title}, slide ${page} of ${deck.pages}`}
          fill
          sizes="(max-width: 1240px) 94vw, 1180px"
          className="object-contain animate-in fade-in duration-300"
          priority
        />
        {page < deck.pages && (
          // Warm the cache for the next slide.
          <link rel="prefetch" as="image" href={slide(deck.slug, page + 1)} />
        )}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={page === 1}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-opacity hover:bg-black/70 disabled:opacity-0"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={page === deck.pages}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-opacity hover:bg-black/70 disabled:opacity-0"
        >
          <ChevronRight className="size-5" />
        </button>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-0.5 font-mono text-xs text-white backdrop-blur-md">
          {page} / {deck.pages}
        </span>
      </div>

      <ol className="flex gap-2 overflow-x-auto pb-1" aria-label="Slides">
        {Array.from({ length: deck.pages }, (_, i) => i + 1).map((n) => (
          <li key={n} className="shrink-0">
            <button
              type="button"
              onClick={() => setPage(n)}
              aria-label={`Go to slide ${n}`}
              aria-current={n === page}
              className={cn(
                "relative block h-12 overflow-hidden rounded-md border-2 transition-all sm:h-14",
                n === page ? "border-violet" : "border-transparent opacity-50 hover:opacity-100",
              )}
              style={{ aspectRatio: deck.ratio }}
            >
              <Image src={slide(deck.slug, n)} alt="" fill sizes="100px" className="object-cover" />
            </button>
          </li>
        ))}
      </ol>
    </DialogContent>
  )
}
