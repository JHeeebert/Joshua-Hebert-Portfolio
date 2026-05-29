/**
 * Shared Framer Motion variants.
 * Import into any section that needs scroll-triggered animations.
 * All sections use useInView({ once: true }) so animations fire once only.
 */

/** Single element fade + rise */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Container that staggers its children */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

/** Heading block — slightly faster, no stagger needed */
export const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}
