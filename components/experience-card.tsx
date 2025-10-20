"use client"

import { motion } from "framer-motion"
import { FiTrash2 } from "react-icons/fi"

interface ExperienceCardProps {
  id: number
  company: string
  role: string
  duration: string
  description: string
  skills: string[]
  onDelete?: (id: number) => void
}

export function ExperienceCard({ id, company, role, duration, description, skills, onDelete }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="card-base border-l-4 border-l-primary relative"
    >
      {/* Delete button */}
      {onDelete && (
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={() => onDelete(id)}
        >
          <FiTrash2 size={18} />
        </button>
      )}

      <div className="flex items-start gap-3 mb-3">
        <span className="text-primary text-lg mt-1 flex-shrink-0">{"💼"}</span>
        <div>
          <h3 className="font-bold text-foreground">{company}</h3>
          <p className="text-sm font-semibold text-primary">{role}</p>
        </div>
      </div>

      {skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-muted text-xs rounded-full">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="text-lg">{"📅"}</span>
        {duration}
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
