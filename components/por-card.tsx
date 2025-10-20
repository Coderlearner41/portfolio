"use client"

import { motion } from "framer-motion"

interface PORCardProps {
  sphere: string
  position: string
  tenure: string
  description: string
}

export function PORCard({ sphere, position, tenure, description }: PORCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileHover={{ y: -4 }} className="card-base border-l-4 border-l-accent">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-accent">{sphere}</h3>
        <p className="text-sm font-semibold text-primary">{position}</p>
        <p className="text-xs text-muted-foreground">{tenure}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
