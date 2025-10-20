"use client"

import { motion } from "framer-motion"

interface ProfileCardProps {
  name: string
  email: string
  tagline: string
  bio: string
  education: string
  image?: string
  socialLinks: {
    github?: string
    linkedin?: string
    portfolio?: string
  }
  badges: string[]
}

export function ProfileCard({ name, email, tagline, bio, image, education, socialLinks, badges }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-base"
    >
      <div className="flex flex-col items-center text-center mb-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-background">DK</span>
        )}
      </div>

        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-primary font-medium mb-4">{tagline}</p>
        <p className="text-muted-foreground max-w-2xl mb-6">{bio}</p>

        <div className="flex gap-4 mb-6">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              className="p-2 rounded-lg bg-card hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <span className="text-lg">{"🔗"}</span>
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              className="p-2 rounded-lg bg-card hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <span className="text-lg">{"💼"}</span>
            </a>
          )}
          {socialLinks.portfolio && (
            <a
              href={socialLinks.portfolio}
              className="p-2 rounded-lg bg-card hover:bg-primary/10 transition-colors"
              aria-label="Portfolio"
              title="Portfolio"
            >
              <span className="text-lg">{"🌐"}</span>
            </a>
          )}
          <a
            href={`mailto:${email}`}
            className="p-2 rounded-lg bg-card hover:bg-primary/10 transition-colors"
            aria-label="Email"
            title="Email"
          >
            <span className="text-lg">{"✉️"}</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {badges.map((badge) => (
            <span key={badge} className="badge-gold">
              {badge}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-1">
            <span className="font-semibold text-foreground">Education:</span> {education}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
