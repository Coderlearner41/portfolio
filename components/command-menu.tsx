"use client"

import {
  Award,
  BookOpen,
  Briefcase,
  Copy,
  FileDown,
  FolderGit2,
  Globe,
  Home,
  Presentation,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { toast } from "sonner"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import type { Profile, SearchResult, SearchType } from "@/lib/types"

const CommandMenuContext = createContext<{ open: () => void }>({ open: () => {} })
export const useCommandMenu = () => useContext(CommandMenuContext)

const SECTIONS = [
  { id: "top", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "sites", label: "Live websites", icon: Globe },
  { id: "decks", label: "Decks", icon: Presentation },
  { id: "research", label: "Research", icon: BookOpen },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "achievements", label: "Achievements", icon: Award },
]

const GROUPS: { type: SearchType; heading: string; icon: typeof Home }[] = [
  { type: "project", heading: "Projects", icon: FolderGit2 },
  { type: "deck", heading: "Decks", icon: Presentation },
  { type: "site", heading: "Live websites", icon: Globe },
  { type: "experience", heading: "Experience", icon: Briefcase },
  { type: "por", heading: "Leadership", icon: Users },
]

/** ⌘K / Ctrl+K palette for jumping to any section, project, deck or live site. */
export function CommandMenuProvider({
  index,
  profile,
  children,
}: {
  index: SearchResult[]
  profile: Pick<Profile, "email" | "resume" | "socials">
  children: ReactNode
}) {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = useCallback(
    (href: string) => {
      setOpen(false)
      if (/^https?:/.test(href) || href.endsWith(".pdf")) {
        window.open(href, "_blank", "noopener,noreferrer")
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        // Setting the hash (rather than router.push) fires hashchange, which opens deck deep links.
        window.location.hash = href.slice(2)
      } else {
        router.push(href)
      }
    },
    [router],
  )

  const grouped = useMemo(
    () => GROUPS.map((g) => ({ ...g, items: index.filter((r) => r.type === g.type) })),
    [index],
  )

  const value = useMemo(() => ({ open: () => setOpen(true) }), [])

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandDialog
        open={isOpen}
        onOpenChange={setOpen}
        title="Search the portfolio"
        description="Jump to a section, project, deck or live website"
        className="glass max-w-xl border-line-strong bg-[#0f0f16]/90 p-0 sm:max-w-xl"
        showCloseButton={false}
      >
        <CommandInput placeholder="Search projects, decks, sites, skills…" />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>Nothing matches. Try “Flutter” or “seismic”.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                navigator.clipboard.writeText(profile.email).then(() => toast.success("Email copied", { description: profile.email }))
                setOpen(false)
              }}
            >
              <Copy /> Copy email
            </CommandItem>
            <CommandItem onSelect={() => go(profile.resume)}>
              <FileDown /> Download resume
            </CommandItem>
            <CommandItem onSelect={() => go(profile.socials.github)}>
              <FaGithub /> GitHub
            </CommandItem>
            <CommandItem onSelect={() => go(profile.socials.linkedin)}>
              <FaLinkedin /> LinkedIn
            </CommandItem>
            <CommandItem onSelect={() => go("/playground")}>
              <Terminal /> Me-API playground
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Sections">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <CommandItem key={id} value={`section ${label}`} onSelect={() => go(`/#${id}`)}>
                <Icon /> {label}
              </CommandItem>
            ))}
          </CommandGroup>
          {grouped.map(({ type, heading, icon: Icon, items }) => (
            <CommandGroup key={type} heading={heading}>
              {items.map((item) => (
                <CommandItem
                  key={String(item.id)}
                  value={`${item.title} ${item.description} ${item.category ?? ""}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon />
                  <span className="truncate">{item.title}</span>
                  {type === "site" && <CommandShortcut>↗</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading="Tip">
            <CommandItem disabled value="tip">
              <Sparkles /> Press ⌘K / Ctrl K anywhere to reopen this
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandMenuContext.Provider>
  )
}
