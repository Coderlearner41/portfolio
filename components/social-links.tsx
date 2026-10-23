import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { SiCodeforces } from "react-icons/si"
import type { Profile } from "@/lib/types"
import { cn } from "@/lib/utils"

export function SocialLinks({ profile, className }: { profile: Profile; className?: string }) {
  const links = [
    { href: profile.socials.github, label: "GitHub", icon: FaGithub },
    { href: profile.socials.linkedin, label: "LinkedIn", icon: FaLinkedin },
    { href: profile.socials.codeforces, label: "Codeforces", icon: SiCodeforces },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  ]
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="grid size-10 place-items-center rounded-full border border-line bg-white/[0.04] text-dim backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-violet/50 hover:text-white"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
