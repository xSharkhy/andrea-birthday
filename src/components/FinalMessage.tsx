import { motion, useReducedMotion } from 'motion/react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  staggerContainerSlow,
  blurIn,
  getScrollAnimationProps,
  defaultViewport,
  strictViewport
} from '@/lib/animations'

export default function FinalMessage() {
  const prefersReducedMotion = useReducedMotion()

  // Find special lines for different styling
  const isSpecialLine = (line: string) => {
    if (line === 'Gràcies.') return 'thanks'
    if (line.includes('0.000000000000000001%')) return 'percentage'
    if (line === '— Ismael') return 'signature'
    if (line === 'Arisca per fora.' || line === 'Increïble per dins.') return 'final'
    if (line.startsWith('Feliç 23')) return 'birthday'
    return null
  }

  return (
    <section className="py-32 px-4 relative" id="final">
      <div className="max-w-2xl mx-auto">
        {/* Pre-title warning */}
        <motion.p
          className="text-center text-sm mb-12"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-mono)'
          }}
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          {copy.finalMessage.preTitle}
        </motion.p>

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          {...getScrollAnimationProps(blurIn, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-purple)',
              fontFamily: 'var(--font-sans)',
              transform: 'rotate(-1deg)'
            }}
          >
            {copy.finalMessage.title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.finalMessage.subtitle}
          </p>
        </motion.div>

        {/* The message */}
        <motion.div
          className="p-8 rounded-lg"
          style={{
            background: 'var(--color-bg-surface)',
            border: '2px solid var(--color-purple-muted)'
          }}
          {...getScrollAnimationProps(staggerContainerSlow, prefersReducedMotion, strictViewport)}
        >
          {copy.finalMessage.text.map((line, index) => {
            const special = isSpecialLine(line)

            return (
              <motion.p
                key={index}
                className={`
                  ${line === '' ? 'h-6' : 'mb-2'}
                  ${special === 'thanks' ? 'text-3xl font-bold my-6' : ''}
                  ${special === 'percentage' ? 'font-mono text-sm' : ''}
                  ${special === 'signature' ? 'text-right text-xl font-bold mt-8' : ''}
                  ${special === 'final' ? 'text-xl font-bold' : ''}
                  ${special === 'birthday' ? 'text-xl' : ''}
                `}
                style={{
                  color: special === 'thanks'
                    ? 'var(--color-kaki)'
                    : special === 'percentage'
                    ? 'var(--color-purple)'
                    : special === 'signature'
                    ? 'var(--color-purple)'
                    : special === 'final'
                    ? 'var(--color-text-bright)'
                    : special === 'birthday'
                    ? 'var(--color-kaki)'
                    : 'var(--color-text)',
                  fontFamily: special === 'thanks' || special === 'birthday'
                    ? 'var(--font-sans)'
                    : special === 'signature'
                    ? 'var(--font-comic)'
                    : 'inherit'
                }}
                variants={fadeInUp}
              >
                {line || '\u00A0'}
              </motion.p>
            )
          })}
        </motion.div>

        {/* Decorative hearts */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          {['💜', '💚', '🖤'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, var(--color-purple-muted) 0%, transparent 50%)',
          opacity: 0.1
        }}
      />
    </section>
  )
}
