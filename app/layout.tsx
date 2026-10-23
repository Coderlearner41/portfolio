import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
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

// Self-hosted Fontshare families (ITF Free Font License) for zero layout shift.
const display = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600" },
  ],
  variable: "--font-clash",
  display: "swap",
})
const sans = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

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
    <html lang="en" className={`${mono.variable} ${display.variable} ${sans.variable}`}>
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
          profile={{ email: profile.email, socials: profile.socials }}
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
