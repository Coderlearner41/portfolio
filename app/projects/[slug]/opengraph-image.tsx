import { ImageResponse } from "next/og"
import { OgCard } from "@/components/og-card"
import { projectsData } from "@/data/projects"

export const alt = "Project by Dhawal Khatri"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }))
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)
  return new ImageResponse(
    <OgCard
      eyebrow={project?.badge ?? project?.category ?? "Project"}
      title={project?.title ?? "Dhawal Khatri"}
      subtitle={project?.tagline ?? ""}
    />,
    size,
  )
}
