"use client"

import { ArrowUpRight, Check, Copy, FileDown, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { GlassCard } from "@/components/glass-card"
import { Magnetic } from "@/components/magnetic"
import { Reveal } from "@/components/reveal"
import { SocialLinks } from "@/components/social-links"
import type { Profile } from "@/lib/types"

export function ContactSection({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    toast.success("Email copied", { description: profile.email })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-max py-20 sm:py-28">
      <Reveal>
        <GlassCard className="overflow-hidden p-8 text-center sm:p-14">
          <div aria-hidden className="absolute inset-x-0 -top-24 -z-10 mx-auto h-64 w-2/3 rounded-full bg-violet/30 blur-[100px]" />
          <p className="eyebrow">09 / Contact</p>
          <h2 id="contact-title" className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
            Let&apos;s build something <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-dim">
            Internships, full-time roles, research collaborations or a hackathon team: my inbox is open.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <Mail className="size-4" /> {profile.email}
              </a>
            </Magnetic>
            <button type="button" onClick={copy} className="btn btn-ghost" aria-label="Copy email address">
              {copied ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-dim">
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link-underline inline-flex items-center gap-1.5 hover:text-ink">
              <Phone className="size-4" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.instituteEmail}`} className="link-underline inline-flex items-center gap-1.5 hover:text-ink">
              <Mail className="size-4" /> {profile.instituteEmail}
            </a>
            <a href={profile.resume} target="_blank" rel="noopener" className="link-underline inline-flex items-center gap-1.5 hover:text-ink">
              <FileDown className="size-4" /> Resume (PDF)
            </a>
          </div>

          <SocialLinks profile={profile} className="mt-8 justify-center" />
        </GlassCard>
      </Reveal>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 text-xs text-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name} · IIT Madras</p>
        <p className="flex items-center gap-4">
          <Link href="/playground" className="link-underline inline-flex items-center gap-1 hover:text-ink">
            Me-API playground <ArrowUpRight className="size-3" />
          </Link>
          <span>Built with Next.js, Prisma and too much coffee</span>
        </p>
      </footer>
    </section>
  )
}
