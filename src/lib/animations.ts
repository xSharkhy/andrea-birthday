/**
 * Animation Variants for Andrea's Birthday
 * Anti-design chaos meets smooth animations
 */

import type { Variants, Transition } from 'motion/react'

// ============================================================================
// TRANSITIONS
// ============================================================================

export const defaultTransition: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1]
}

export const quickTransition: Transition = {
  duration: 0.4,
  ease: 'easeOut'
}

export const slowTransition: Transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1]
}

export const dramaticTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1]
}

export const bouncyTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20
}

export const chaosTransition: Transition = {
  duration: 0.3,
  ease: 'easeInOut'
}

// ============================================================================
// FADE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition }
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: defaultTransition }
}

export const fadeInUpDramatic: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: dramaticTransition }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: defaultTransition }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: defaultTransition }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: defaultTransition }
}

// ============================================================================
// SCALE VARIANTS
// ============================================================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition }
}

export const scaleInBouncy: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: bouncyTransition }
}

export const scaleInDramatic: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

// ============================================================================
// BLUR VARIANTS
// ============================================================================

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: defaultTransition }
}

export const blurInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: defaultTransition }
}

// ============================================================================
// CHAOS VARIANTS (Anti-design special)
// ============================================================================

export const chaosEntry: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -15,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: bouncyTransition
  }
}

export const wobble: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const tiltIn: Variants = {
  hidden: { opacity: 0, rotate: 10, x: -30 },
  visible: {
    opacity: 1,
    rotate: -2, // Stays tilted intentionally
    x: 0,
    transition: defaultTransition
  }
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: [0, 1.2, 0.9, 1.05, 1],
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// ============================================================================
// LETTER BY LETTER (For hero name)
// ============================================================================

export const letterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3
    }
  }
}

export const letterVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotate: Math.random() * 20 - 10
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
}

// ============================================================================
// STAGGER CONTAINERS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: dramaticTransition }
}

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: dramaticTransition }
}

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: dramaticTransition }
}

export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: dramaticTransition }
}

export const scrollRevealBlur: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)', y: 30 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: dramaticTransition }
}

export const scrollRevealChaos: Variants = {
  hidden: { opacity: 0, rotate: 15, scale: 0.8, x: -50 },
  visible: {
    opacity: 1,
    rotate: -2, // Intentionally not straight
    scale: 1,
    x: 0,
    transition: dramaticTransition
  }
}

// ============================================================================
// INTERACTIVE VARIANTS
// ============================================================================

export const breakVariant = {
  initial: { scale: 1, rotate: 0, opacity: 1 },
  breaking: {
    scale: [1, 1.1, 0.8],
    rotate: [0, -5, 10],
    opacity: [1, 1, 0.3],
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  broken: {
    scale: 0.8,
    rotate: 10,
    opacity: 0.3,
    filter: 'grayscale(1)'
  }
}

export const hoverWobble = {
  rotate: [0, -2, 2, -2, 0],
  transition: { duration: 0.4 }
}

export const hoverScale = {
  scale: 1.05,
  transition: quickTransition
}

export const hoverLift = {
  y: -8,
  transition: quickTransition
}

export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
}

// ============================================================================
// VIEWPORT CONFIG
// ============================================================================

export const defaultViewport = {
  once: true,
  amount: 0.3
}

export const strictViewport = {
  once: true,
  amount: 0.5
}

export const earlyViewport = {
  once: true,
  amount: 0.1
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAnimationProps(
  variants: Variants,
  prefersReducedMotion: boolean | null
) {
  if (prefersReducedMotion) {
    return { initial: {}, animate: {}, variants: undefined }
  }
  return { initial: 'hidden', animate: 'visible', variants }
}

export function getScrollAnimationProps(
  variants: Variants,
  prefersReducedMotion: boolean | null,
  viewport = defaultViewport
) {
  if (prefersReducedMotion) {
    return { initial: {}, whileInView: {}, variants: undefined, viewport: undefined }
  }
  return { initial: 'hidden', whileInView: 'visible', variants, viewport }
}

export function getAlternatingVariant(index: number): Variants {
  const variants = [
    scrollReveal,
    scrollRevealLeft,
    scrollRevealRight,
    scrollRevealScale,
    scrollRevealChaos
  ]
  return variants[index % variants.length]
}

export function getRandomTilt(): number {
  const tilts = [-4, -2, -1, 1, 2, 3, 4]
  return tilts[Math.floor(Math.random() * tilts.length)]
}
