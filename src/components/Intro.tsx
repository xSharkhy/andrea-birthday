import { motion, useReducedMotion } from 'motion/react'
import { copy } from '@/data/copy'
import {
  staggerContainer,
  fadeInUp,
  getScrollAnimationProps,
  defaultViewport
} from '@/lib/animations'

export default function Intro() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="relative p-8 rounded-lg"
          style={{
            background: 'var(--color-bg-surface)',
            border: '2px dashed var(--color-purple)',
            transform: 'rotate(-1deg)'
          }}
          {...getScrollAnimationProps(staggerContainer, prefersReducedMotion, defaultViewport)}
        >
          {/* Decorative tape */}
          <div
            className="absolute -top-3 left-1/4 w-20 h-6"
            style={{
              background: 'var(--color-accent-yellow)',
              transform: 'rotate(-8deg)',
              opacity: 0.9
            }}
          />
          <div
            className="absolute -top-2 right-1/4 w-16 h-5"
            style={{
              background: 'var(--color-kaki)',
              transform: 'rotate(5deg)',
              opacity: 0.9
            }}
          />

          {copy.intro.lines.map((line, index) => (
            <motion.p
              key={index}
              className={`
                ${line === '' ? 'h-4' : 'mb-1'}
                ${line.startsWith('•') ? 'pl-4' : ''}
                ${line === 'Waskatraska.' ? 'text-xl font-bold mt-4' : 'text-base'}
              `}
              style={{
                color: line === 'Waskatraska.'
                  ? 'var(--color-purple)'
                  : line === 'O no.'
                  ? 'var(--color-kaki)'
                  : 'var(--color-text)',
                fontFamily: line === 'Waskatraska.'
                  ? 'var(--font-comic)'
                  : line.includes('disseny')
                  ? 'var(--font-times)'
                  : 'inherit'
              }}
              variants={fadeInUp}
            >
              {line || '\u00A0'}
            </motion.p>
          ))}

          {/* Corner decorations */}
          <div className="absolute -bottom-2 -right-2 text-3xl" style={{ transform: 'rotate(15deg)' }}>
            ✨
          </div>
        </motion.div>

        {/* Random floating element */}
        <motion.div
          className="absolute -right-8 top-1/3 text-6xl opacity-20"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🪑
        </motion.div>
      </div>
    </section>
  )
}
