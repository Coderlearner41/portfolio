"use client"

import { motion } from "framer-motion"

interface SkillTagsProps {
  skills: {
    category: string
    items: string[]
  }[]
}

const categoryColors: Record<string, string> = {
  Technical: "badge-primary",
  "Finance & Analytics": "badge-gold",
  Tools: "badge-accent",
}

export function SkillTags({ skills }: SkillTagsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card-base"
    >
      <h2 className="section-heading">
        <span className="text-primary">◆</span> Skills
      </h2>

      <div className="space-y-6">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{skillGroup.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span key={skill} className={categoryColors[skillGroup.category] || "badge-primary"}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
