import { motion, useReducedMotion } from 'motion/react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  staggerContainer,
  getScrollAnimationProps,
  getAlternatingVariant,
  defaultViewport
} from '@/lib/animations'

export default function Learned() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 px-4 relative" id="learned">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-purple)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(-1deg)'
            }}
          >
            {copy.learned.title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.learned.subtitle}
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          className="mb-12 text-center"
          {...getScrollAnimationProps(staggerContainer, prefersReducedMotion, defaultViewport)}
        >
          {copy.learned.intro.map((line, i) => (
            <motion.p
              key={i}
              className="mb-1"
              style={{
                color: line.includes('substàncies')
                  ? 'var(--color-kaki)'
                  : 'var(--color-text-muted)'
              }}
              variants={fadeInUp}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Items */}
        <div className="space-y-6">
          {copy.learned.items.map((item, index) => {
            const formatStyles: Record<string, { border: string; labelColor: string; labelFont: string }> = {
              fact: { border: 'var(--color-kaki)', labelColor: 'var(--color-kaki)', labelFont: 'var(--font-mono)' },
              story: { border: 'var(--color-purple)', labelColor: 'var(--color-purple)', labelFont: 'var(--font-comic)' },
              stat: { border: 'var(--color-accent-yellow)', labelColor: 'var(--color-accent-yellow)', labelFont: 'var(--font-mono)' },
              discovery: { border: 'var(--color-accent-pink)', labelColor: 'var(--color-accent-pink)', labelFont: 'var(--font-impact)' },
              tutorial: { border: 'var(--color-kaki)', labelColor: 'var(--color-kaki)', labelFont: 'var(--font-mono)' },
              warning: { border: 'var(--color-accent-red)', labelColor: 'var(--color-accent-red)', labelFont: 'var(--font-impact)' },
              conclusion: { border: 'var(--color-purple)', labelColor: 'var(--color-purple)', labelFont: 'var(--font-times)' }
            }
            const style = formatStyles[item.format] || formatStyles.fact

            return (
              <motion.div
                key={index}
                className="relative p-6 rounded-lg"
                style={{
                  background: 'var(--color-bg-surface)',
                  borderLeft: `4px solid ${style.border}`,
                  transform: `rotate(${(index % 3 - 1) * 0.8}deg)`
                }}
                {...getScrollAnimationProps(getAlternatingVariant(index), prefersReducedMotion, defaultViewport)}
              >
                {/* Label */}
                <span
                  className="text-xs font-bold mb-2 block uppercase tracking-wider"
                  style={{
                    color: style.labelColor,
                    fontFamily: style.labelFont
                  }}
                >
                  {item.label}
                </span>

                <p
                  className="text-lg mb-2"
                  style={{
                    color: 'var(--color-text-bright)',
                    fontFamily: item.format === 'conclusion' ? 'var(--font-times)' : 'inherit'
                  }}
                >
                  {item.text}
                </p>

                {item.note && (
                  <p
                    className="text-sm italic"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-comic)'
                    }}
                  >
                    {item.note}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute right-5 top-1/4 text-6xl opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        🍷
      </motion.div>
      <motion.div
        className="absolute left-5 bottom-1/4 text-5xl opacity-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        💊
      </motion.div>
    </section>
  )
}
