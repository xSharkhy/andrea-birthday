import { motion, useReducedMotion } from 'motion/react'
import { useState, useEffect } from 'react'
import { copy } from '@/data/copy'
import {
  letterContainer,
  staggerContainer,
  fadeInUp,
  getAnimationProps,
  bouncyTransition
} from '@/lib/animations'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showScroll, setShowScroll] = useState(false)

  // Stagger the reveals
  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2500)
    const scrollTimer = setTimeout(() => setShowScroll(true), 4000)
    return () => {
      clearTimeout(subtitleTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  const nameWords = copy.hero.name.split(' ')

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background chaos elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Random decorative elements */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          🪑
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-20 text-4xl opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌻
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-10 text-5xl opacity-10"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎮
        </motion.div>
        <div className="absolute bottom-20 left-1/4 text-3xl opacity-10 tilt-left">
          🥔
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* The epic name reveal */}
        <motion.div
          className="mb-8"
          variants={letterContainer}
          initial="hidden"
          animate="visible"
        >
          {nameWords.map((word, wordIndex) => (
            <div key={wordIndex} className="inline-block mx-2 mb-4">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  className="inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold"
                  style={{
                    color: wordIndex % 2 === 0 ? 'var(--color-purple)' : 'var(--color-kaki)',
                    fontFamily: wordIndex === 0 ? 'var(--font-impact)' :
                               wordIndex === 1 ? 'var(--font-comic)' :
                               wordIndex === 2 ? 'var(--font-times)' : 'var(--font-mono)',
                    textShadow: '2px 2px 0 var(--color-bg-elevated), 4px 4px 0 var(--color-purple-dark)'
                  }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 100,
                      rotate: Math.random() * 40 - 20,
                      scale: 0.5
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotate: (letterIndex % 3 - 1) * 3, // Stays slightly tilted
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 150,
                        damping: 12,
                        delay: wordIndex * 0.3 + letterIndex * 0.05
                      }
                    }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Age - Big and chaotic */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -5,
          }}
          transition={{
            delay: 1.8,
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
        >
          <span
            className="text-[150px] sm:text-[200px] md:text-[250px] font-bold leading-none"
            style={{
              background: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-kaki) 50%, var(--color-accent-pink) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-impact)',
              textShadow: 'none',
              filter: 'drop-shadow(4px 4px 0 var(--color-purple-dark))'
            }}
          >
            23
          </span>
        </motion.div>

        {/* Subtitle lines */}
        {showSubtitle && (
          <motion.div
            className="space-y-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {copy.hero.subtitle.map((line, index) => (
              <motion.p
                key={index}
                className="text-lg sm:text-xl md:text-2xl"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: index === 2 ? 'var(--font-comic)' : 'var(--font-mono)',
                  transform: `rotate(${(index - 1) * 1.5}deg)`
                }}
                variants={fadeInUp}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        {showScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm text-[--color-text-muted] font-comic">
              {copy.ui.scrollDown}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Anti-design corner decorations */}
      <div
        className="absolute top-4 left-4 px-3 py-1 text-xs font-comic"
        style={{
          background: 'var(--color-accent-yellow)',
          color: 'black',
          transform: 'rotate(-5deg)'
        }}
      >
        GRAPHIC DESIGN IS MY PASSION
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1 text-xs"
        style={{
          background: 'var(--color-accent-pink)',
          color: 'white',
          transform: 'rotate(3deg)',
          fontFamily: 'var(--font-papyrus)'
        }}
      >
        * efectes especials *
      </div>
    </section>
  )
}
