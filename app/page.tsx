import { About } from "@/components/sections/about"
import { AchievementsSection } from "@/components/sections/achievements"
import { ContactSection } from "@/components/sections/contact"
import { DecksSection } from "@/components/sections/decks"
import { ExperienceSection } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { LeadershipSection } from "@/components/sections/leadership"
import { ProjectsSection } from "@/components/sections/projects"
import { ResearchSection } from "@/components/sections/research"
import { SitesSection } from "@/components/sections/sites"
import { SkillsSection } from "@/components/sections/skills"
import { getContent } from "@/lib/content"

// Re-read content from the database at most once an hour (writes via the API revalidate immediately).
export const revalidate = 3600

export default async function HomePage() {
  const content = await getContent()
  const { profile } = content

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "AI/ML and Full-stack Engineer",
    alumniOf: profile.education.institute,
    email: `mailto:${profile.email}`,
    sameAs: Object.values(profile.socials),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero profile={profile} />
      <About profile={profile} />
      <ExperienceSection experiences={content.experiences} />
      <ProjectsSection projects={content.projects} />
      <SitesSection sites={content.sites} />
      <DecksSection decks={content.decks} />
      <ResearchSection publications={content.publications} />
      <LeadershipSection pors={content.pors} />
      <AchievementsSection achievements={content.achievements} />
      <SkillsSection skills={content.skills} />
      <ContactSection profile={profile} />
    </>
  )
}
