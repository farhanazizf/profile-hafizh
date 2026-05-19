import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-into-view section reveal (spec §2.5, refined).
 * Triggers when the block's top crosses ~82% of the viewport height (via a
 * negative bottom root-margin), so the motion is actually seen rather than
 * completing off-screen — and it stays correct for sections taller than the
 * viewport. Rise + fade + a brief focus-blur for an editorial "settle". One-shot.
 * Reduced motion is snapped globally by <MotionConfig reducedMotion="user">.
 */
export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
        filter: { duration: 0.55, ease: 'easeOut', delay },
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
