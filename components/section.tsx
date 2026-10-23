import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

/** Page section with a numbered eyebrow, title and optional intro. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("container-max py-20 sm:py-28", className)}>
      <Reveal className="mb-10 max-w-2xl sm:mb-14">
        <p className="eyebrow mb-4">
          <span className="text-faint">{index} /</span> {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-base text-dim sm:text-lg">{intro}</p>}
      </Reveal>
      {children}
    </section>
  )
}
