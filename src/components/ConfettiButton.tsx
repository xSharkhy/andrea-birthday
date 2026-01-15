import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { copy } from '@/data/copy'

interface ConfettiButtonProps {
  children: ReactNode
  className?: string
}

export default function ConfettiButton({ children, className = '' }: ConfettiButtonProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const triggerConfetti = async () => {
    // Dynamic import for confetti
    const confetti = (await import('canvas-confetti')).default

    // Random message
    const messages = copy.interactive.confetti
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setShowMessage(true)

    // Andrea's colors: purple, kaki, black
    const colors = ['#a855f7', '#84a344', '#1a1a1a', '#ec4899', '#facc15']

    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors
    })

    // Second burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      })
    }, 200)

    setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={triggerConfetti}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>

      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap"
          style={{
            background: 'var(--color-kaki)',
            color: 'white',
            fontFamily: 'var(--font-comic)'
          }}
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}
