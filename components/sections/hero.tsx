import { ArrowDown, GraduationCap, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { Counter } from "@/components/counter"
import { GlassCard } from "@/components/glass-card"
import { Magnetic } from "@/components/magnetic"
import { Reveal } from "@/components/reveal"
import { RotatingText } from "@/components/rotating-text"
import { SocialLinks } from "@/components/social-links"
import type { Profile } from "@/lib/types"

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="container-max relative pb-16 pt-32 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <p className="chip mb-6 border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.available}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
              <span className="text-gradient">{profile.name.split(" ")[0]}</span>
              <br />
              <span className="text-ink">{profile.name.split(" ").slice(1).join(" ")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-xl text-ink sm:text-2xl">
              <RotatingText words={profile.roles} />
            </p>
            <p className="mt-4 max-w-xl text-base text-dim sm:text-lg">{profile.headline}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" className="btn btn-primary">
                  See my work <ArrowDown className="size-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  <Mail className="size-4" /> Get in touch
                </a>
              </Magnetic>
            </div>
            <SocialLinks profile={profile} className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet/40 via-transparent to-pink/30 blur-2xl" />
          <GlassCard className="overflow-hidden p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
              <Image
                src={profile.image}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 text-xs">
                <span className="chip border-white/15 bg-black/40 text-white backdrop-blur-md">
                  <GraduationCap className="size-3.5" /> IIT Madras · {profile.education.years}
                </span>
                <span className="chip border-white/15 bg-black/40 text-white backdrop-blur-md">
                  <MapPin className="size-3.5" /> {profile.location}
                </span>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.05 * i}>
            <GlassCard className="h-full p-5">
              <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
                <Counter value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-xs text-faint">{stat.detail}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
