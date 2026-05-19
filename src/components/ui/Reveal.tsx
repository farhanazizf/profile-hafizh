import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * One-shot fade + 8px rise on scroll-into-view (spec §2.5).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">,
 * which snaps these transitions instead of animating them.
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
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
