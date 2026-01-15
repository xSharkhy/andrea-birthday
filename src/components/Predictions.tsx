import { motion, useReducedMotion } from 'motion/react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  staggerContainer,
  scaleInBouncy,
  getScrollAnimationProps,
  getAlternatingVariant,
  defaultViewport
} from '@/lib/animations'
import BreakableElement from './BreakableElement'

export default function Predictions() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="predictions">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-kaki)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(1deg)'
            }}
          >
            {copy.predictions.title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.predictions.subtitle}
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          className="mb-12 text-center"
          {...getScrollAnimationProps(staggerContainer, prefersReducedMotion, defaultViewport)}
        >
          {copy.predictions.intro.map((line, i) => (
            <motion.p
              key={i}
              className={line === '' ? 'h-4' : 'mb-1'}
              style={{
                color: line.includes('Ací tens')
                  ? 'var(--color-purple)'
                  : 'var(--color-text-muted)'
              }}
              variants={fadeInUp}
            >
              {line || '\u00A0'}
            </motion.p>
          ))}
        </motion.div>

        {/* Prediction cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {copy.predictions.items.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg relative group"
              style={{
                background: 'var(--color-bg-surface)',
                border: '2px solid var(--color-border)',
                transform: `rotate(${(index % 3 - 1) * 2}deg)`
              }}
              {...getScrollAnimationProps(scaleInBouncy, prefersReducedMotion, defaultViewport)}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                transition: { duration: 0.2 }
              }}
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h3
                className="text-sm font-bold mb-3 uppercase tracking-wider"
                style={{
                  color: index % 2 === 0 ? 'var(--color-purple)' : 'var(--color-kaki)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {item.title}
              </h3>

              {/* Text */}
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--color-text)',
                  fontFamily: index === 0 ? 'var(--font-comic)' : 'inherit'
                }}
              >
                {item.text}
              </p>

              {/* Decorative star */}
              <div
                className="absolute -top-2 -right-2 text-lg opacity-50"
                style={{ transform: 'rotate(15deg)' }}
              >
                ★
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mystical decoration */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-4xl">🔮</span>
          <p
            className="text-sm mt-2"
            style={{
              color: 'var(--color-text-dark)',
              fontFamily: 'var(--font-papyrus)'
            }}
          >
            * prediccions subjectes a canvis segons el destí *
          </p>
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </section>
  )
}
