export type Links = {
  github?: string
  demo?: string
  paper?: string
  deck?: string
}

export type Profile = {
  name: string
  initials: string
  roles: string[]
  headline: string
  bio: string
  location: string
  image: string
  resume: string
  email: string
  instituteEmail: string
  phone: string
  available: string
  education: {
    degree: string
    institute: string
    years: string
    cgpa: string
    school: string
  }
  socials: {
    github: string
    linkedin: string
    codeforces: string
    kaggle: string
  }
  stats: Stat[]
}

export type Stat = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
}

export type ProjectCategory = "Research" | "Competition" | "AI / ML" | "Product"

export type Project = {
  id?: number
  slug: string
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  badge?: string | null
  date: string
  role?: string | null
  skills: string[]
  highlights: string[]
  links: Links
  featured: boolean
  order: number
}

export type Experience = {
  id?: number
  company: string
  role: string
  duration: string
  kind: "Internship" | "Freelance"
  location?: string | null
  description: string
  highlights: string[]
  skills: string[]
  order: number
}

export type Por = {
  id?: number
  sphere: string
  position: string
  tenure: string
  description: string
  highlights: string[]
  skills: string[]
  order: number
}

export type Deck = {
  id?: number
  slug: string
  title: string
  event: string
  summary: string
  role: string
  date: string
  pages: number
  ratio: number
  tags: string[]
  order: number
}

export type Site = {
  id?: number
  slug: string
  name: string
  url: string
  repo?: string | null
  description: string
  stack: string[]
  host: "Vercel" | "Render"
  order: number
}

export type Achievement = {
  id?: number
  title: string
  detail: string
  year: string
  tier: "gold" | "silver" | "bronze" | "award" | "cert"
  order: number
}

export type Publication = {
  id?: number
  title: string
  authors: string
  venue: string
  status: string
  year: string
  order: number
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type Content = {
  profile: Profile
  skills: SkillGroup[]
  projects: Project[]
  experiences: Experience[]
  pors: Por[]
  decks: Deck[]
  sites: Site[]
  achievements: Achievement[]
  publications: Publication[]
  source: "database" | "static"
}

export type SearchType = "project" | "experience" | "por" | "deck" | "site" | "achievement" | "publication"

export type SearchResult = {
  id: number | string
  type: SearchType
  title: string
  description: string
  category: string | null
  href: string
}
