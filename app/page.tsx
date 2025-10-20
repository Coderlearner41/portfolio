"use client"

import { ProfileCard } from "@/components/profile-card"
import { SkillTags } from "@/components/skill-tags"
import { profileData, skillsData } from "@/data/profile"

export default function ProfilePage() {
  return (
    <div className="container-max py-12 space-y-8">
      <ProfileCard {...profileData} />
      <SkillTags skills={skillsData} />
    </div>
  )
}
