"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

/** Cycles through `words` with a vertical slide. */
export function RotatingText({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [interval, reduce, words.length])

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
          // Solid colour: background-clip:text on a transformed element renders blank in Chromium.
          className="whitespace-nowrap text-violet-soft"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
