import { motion, useReducedMotion } from 'motion/react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
  getScrollAnimationProps,
  getAlternatingVariant,
  defaultViewport
} from '@/lib/animations'
import BreakableElement from './BreakableElement'

export default function Timeline() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 px-4 relative" id="timeline">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 inline-block"
            style={{
              color: 'var(--color-kaki)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(1deg)'
            }}
          >
            <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.5em' }}>QUASI</span>{' '}
            {copy.timeline.title.replace('QUASI ', '')}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.timeline.subtitle}
          </p>
        </motion.div>

        {/* Intro text */}
        <motion.div
          className="mb-12 text-center"
          {...getScrollAnimationProps(staggerContainer, prefersReducedMotion, defaultViewport)}
        >
          {copy.timeline.intro.map((line, i) => (
            <motion.p
              key={i}
              className={`${line === '' ? 'h-4' : 'mb-1'} ${
                line === 'Però no.' ? 'text-xl font-bold' : ''
              }`}
              style={{
                color: line === 'Però no.'
                  ? 'var(--color-purple)'
                  : 'var(--color-text-muted)'
              }}
              variants={fadeInUp}
            >
              {line || '\u00A0'}
            </motion.p>
          ))}
        </motion.div>

        {/* Stats list */}
        <motion.div
          className="space-y-4"
          {...getScrollAnimationProps(staggerContainerSlow, prefersReducedMotion, defaultViewport)}
        >
          {copy.timeline.stats.map((stat, index) => {
            const isSubItem = stat.label.startsWith('↳')
            const isLoading = stat.value.includes('LOADING')

            return (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${isSubItem ? 'ml-8' : ''}`}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: `1px solid ${isLoading ? 'var(--color-accent-yellow)' : 'var(--color-border)'}`,
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 0.5}deg)`
                }}
                variants={getAlternatingVariant(index)}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span
                    className="font-bold"
                    style={{
                      color: isSubItem ? 'var(--color-text-muted)' : 'var(--color-purple)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className={`text-right ${isLoading ? 'cursor-blink' : ''}`}
                    style={{
                      color: isLoading
                        ? 'var(--color-accent-yellow)'
                        : stat.value.includes('ràbia')
                        ? 'var(--color-accent-pink)'
                        : 'var(--color-kaki)',
                      fontFamily: isLoading ? 'var(--font-mono)' : 'var(--font-comic)'
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative timeline line */}
        <motion.div
          className="absolute left-8 top-48 bottom-20 w-1 hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, var(--color-purple), var(--color-kaki), transparent)'
          }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Floating decorations */}
      <motion.div
        className="absolute right-10 top-20 text-5xl opacity-15"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎪
      </motion.div>
      <motion.div
        className="absolute left-10 bottom-20 text-4xl opacity-15"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎵
      </motion.div>
    </section>
  )
}
