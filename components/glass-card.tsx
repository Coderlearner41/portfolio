"use client"

import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react"
import { cn } from "@/lib/utils"

type GlassCardProps<T extends ElementType> = {
  as?: T
  spotlight?: boolean
} & ComponentPropsWithoutRef<T>

/** Glass surface whose border and fill light up under the cursor. */
export function GlassCard<T extends ElementType = "div">({
  as,
  spotlight = true,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassCardProps<T>) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement>(null)

  return (
    <Tag
      ref={ref}
      className={cn("glass", spotlight && "glass-spotlight", className)}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        if (spotlight && ref.current && e.pointerType === "mouse") {
          const rect = ref.current.getBoundingClientRect()
          ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`)
          ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`)
          ref.current.style.setProperty("--spot", "1")
        }
        onPointerMove?.(e)
      }}
      onPointerLeave={(e: React.PointerEvent<HTMLElement>) => {
        ref.current?.style.setProperty("--spot", "0")
        onPointerLeave?.(e)
      }}
      {...props}
    />
  )
}
