import { motion, AnimatePresence } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { copy } from '@/data/copy'

interface BreakableElementProps {
  children: ReactNode
  className?: string
  onBreak?: () => void
}

export default function BreakableElement({ children, className = '', onBreak }: BreakableElementProps) {
  const [isBroken, setIsBroken] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleClick = () => {
    if (isBroken) return

    // Get random break message
    const messages = copy.interactive.break
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setIsBroken(true)
    setShowMessage(true)

    // Trigger confetti or other effects
    onBreak?.()

    // Hide message after delay
    setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div className="relative">
      <motion.div
        className={`cursor-pointer ${className}`}
        onClick={handleClick}
        animate={isBroken ? {
          scale: 0.8,
          rotate: 10,
          opacity: 0.3,
          filter: 'grayscale(1)'
        } : {}}
        whileHover={!isBroken ? { scale: 1.05 } : {}}
        whileTap={!isBroken ? { scale: 0.95 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50"
            style={{
              background: 'var(--color-purple)',
              color: 'white',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
