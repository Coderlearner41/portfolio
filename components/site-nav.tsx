"use client"

import { Menu, Search, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useCommandMenu } from "@/components/command-menu"
import { cn } from "@/lib/utils"

const LINKS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "sites", label: "Sites" },
  { id: "decks", label: "Decks" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
]

/** Floating glass pill nav with scroll-spy highlighting of the current section. */
export function SiteNav({ initials }: { initials: string }) {
  const pathname = usePathname()
  const { open } = useCommandMenu()
  const [active, setActive] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const onHome = pathname === "/"

  useEffect(() => {
    if (!onHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const { id } of LINKS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [onHome])

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="glass flex w-full max-w-3xl items-center gap-1 rounded-full py-1.5 pl-2 pr-1.5"
      >
        <Link
          href="/"
          className="mr-1 grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet to-pink font-display text-sm font-semibold text-white"
          aria-label="Home"
        >
          {initials}
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={href(id)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  active === id ? "text-white" : "text-dim hover:text-ink",
                )}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={open}
            className="flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-sm text-dim transition-colors hover:text-ink"
            aria-label="Open search (Ctrl K)"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-white/10 px-1.5 font-mono text-[10px] text-dim sm:inline">⌘K</kbd>
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-dim hover:text-ink md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="glass absolute inset-x-4 top-16 grid gap-1 rounded-2xl p-2 md:hidden"
          >
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={href(id)}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-ink hover:bg-white/5"
                >
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
