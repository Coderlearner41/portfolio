import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import type React from "react"
import { Toaster } from "sonner"
import { Backdrop } from "@/components/backdrop"
import { CommandMenuProvider } from "@/components/command-menu"
import { ScrollProgress } from "@/components/scroll-progress"
import { SiteNav } from "@/components/site-nav"
import { YarnCursor } from "@/components/yarn-cursor"
import { getContent } from "@/lib/content"
import { buildIndex } from "@/lib/search"
import "./globals.css"

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dhawal-khatri.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dhawal Khatri: AI/ML · Full-stack · IIT Madras",
    template: "%s · Dhawal Khatri",
  },
  description:
    "Portfolio of Dhawal Khatri, IIT Madras: AI/ML and full-stack engineer. Projects, live websites, decks, research and leadership.",
  keywords: ["Dhawal Khatri", "IIT Madras", "portfolio", "AI/ML engineer", "full-stack developer", "Flutter", "Next.js"],
  authors: [{ name: "Dhawal Khatri", url: SITE_URL }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Dhawal Khatri: AI/ML · Full-stack · IIT Madras",
    description: "Projects, live websites, decks, research and leadership.",
    siteName: "Dhawal Khatri",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#08080c",
  colorScheme: "dark",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent()
  const { profile } = content

  return (
    <html lang="en" className={mono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Backdrop />
        <ScrollProgress />
        <CommandMenuProvider
          index={buildIndex(content)}
          profile={{ email: profile.email, resume: profile.resume, socials: profile.socials }}
        >
          <SiteNav initials={profile.initials} />
          <main id="main">{children}</main>
        </CommandMenuProvider>
        <YarnCursor />
        <Toaster theme="dark" position="bottom-center" toastOptions={{ className: "glass !bg-[#111118]/90 !border-line" }} />
        <Analytics />
      </body>
    </html>
  )
}
