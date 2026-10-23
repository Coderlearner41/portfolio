import { ImageResponse } from "next/og"
import { OgCard } from "@/components/og-card"
import { profileData } from "@/data/profile"

export const alt = "Dhawal Khatri: AI/ML and Full-stack Engineer, IIT Madras"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(<OgCard eyebrow="IIT Madras · Portfolio" title={profileData.name} subtitle={profileData.headline} />, size)
}
