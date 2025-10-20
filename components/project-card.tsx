"use client"

import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  date?: string
  skills?: string[]
  links?: {
    github?: string
    demo?: string
  }
}

export function ProjectCard({ title, description, date, skills = [], links }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="card-base p-5 rounded-2xl border bg-card hover:shadow-lg transition-all"
    >
      <h3 className="text-xl font-semibold mb-1">💻 {title}</h3>

      {date && <p className="text-sm text-muted-foreground mb-1">🗓️ {date}</p>}

      {/* Links */}
      <div className="flex items-center gap-3 mb-2">
        {links?.demo && (
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            🔗 Visit Project
          </a>
        )}
        {links?.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            🐙 GitHub
          </a>
        )}
      </div>

      <p className="mt-2 text-muted-foreground">🧠 {description}</p>

      {/* Optional Skill Badges */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="badge-primary text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}
