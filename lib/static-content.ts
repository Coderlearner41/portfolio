import { experienceData } from "@/data/experience"
import { porData } from "@/data/por"
import { profileData, skillsData } from "@/data/profile"
import { projectsData } from "@/data/projects"
import { achievementsData, decksData, publicationsData, sitesData } from "@/data/showcase"
import type { Content } from "@/lib/types"

export const staticContent: Content = {
  profile: profileData,
  skills: skillsData,
  projects: projectsData,
  experiences: experienceData,
  pors: porData,
  decks: decksData,
  sites: sitesData,
  achievements: achievementsData,
  publications: publicationsData,
  source: "static",
}
