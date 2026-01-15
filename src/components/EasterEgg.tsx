import { motion, AnimatePresence } from 'motion/react'
import { useState, type ReactNode } from 'react'

interface EasterEggProps {
  trigger: ReactNode
  content: ReactNode
  triggerClassName?: string
}

export default function EasterEgg({ trigger, content, triggerClassName = '' }: EasterEggProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        className={`cursor-help ${triggerClassName}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {trigger}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4 p-6 rounded-lg"
              style={{
                background: 'var(--color-bg-surface)',
                border: '3px solid var(--color-purple)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {content}

              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg"
                style={{
                  background: 'var(--color-purple)',
                  color: 'white'
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
