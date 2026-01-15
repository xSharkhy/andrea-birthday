import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef, type ReactNode } from 'react'
import { copy } from '@/data/copy'
import confetti from 'canvas-confetti'

interface BreakableElementProps {
  children: ReactNode
  className?: string
  onBreak?: () => void
}

export default function BreakableElement({ children, className = '', onBreak }: BreakableElementProps) {
  const [isBroken, setIsBroken] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const elementRef = useRef<HTMLDivElement>(null)

  const triggerExplosion = () => {
    if (!elementRef.current) return

    // Get element position for confetti origin
    const rect = elementRef.current.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    // Explosion de confeti des de l'element
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { x, y },
      colors: ['#a855f7', '#84a344', '#ec4899', '#facc15', '#ef4444'],
      startVelocity: 30,
      gravity: 1.2,
      scalar: 0.8,
      ticks: 100
    })

    // Segona explosió amb formes diferents
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x, y },
        colors: ['#ffffff', '#a855f7', '#84a344'],
        shapes: ['circle'],
        startVelocity: 20,
        gravity: 0.8,
        scalar: 0.6,
        ticks: 80
      })
    }, 100)
  }

  const handleClick = () => {
    if (isBroken) return

    // Get random break message
    const messages = copy.interactive.break
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setIsBroken(true)
    setShowMessage(true)

    // Trigger explosion effect
    triggerExplosion()

    // Trigger callback
    onBreak?.()

    // Hide message after delay
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <>
      <div className="relative" ref={elementRef}>
        <motion.div
          className={`cursor-pointer ${className}`}
          onClick={handleClick}
          initial={false}
          animate={isBroken ? {
            scale: [1, 1.3, 0],
            rotate: [0, 20, -10],
            opacity: [1, 1, 0],
          } : {}}
          transition={isBroken ? { duration: 0.4, ease: 'easeOut' } : { duration: 0.2 }}
          whileHover={!isBroken ? { scale: 1.1 } : {}}
          whileTap={!isBroken ? { scale: 0.9 } : {}}
        >
          {children}
        </motion.div>
      </div>

      {/* Missatge centrat a la pantalla - molt més visible */}
      <AnimatePresence>
        {showMessage && (
          <>
            {/* Backdrop subtil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[100] pointer-events-none"
            />

            {/* Missatge centrat */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [0, -3, 3, -2, 2, 0],
              }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{
                duration: 0.5,
                rotate: { duration: 0.5, delay: 0.2 }
              }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] px-8 py-6 rounded-xl text-center max-w-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-purple-dark) 100%)',
                color: 'white',
                fontFamily: 'var(--font-comic)',
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)',
                border: '3px solid var(--color-kaki)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl mb-4"
              >
                💥
              </motion.div>
              <p className="text-xl font-bold leading-relaxed">
                {message}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
