import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  staggerContainer,
  getScrollAnimationProps,
  defaultViewport
} from '@/lib/animations'

type GameState = 'intro' | 'playing' | 'defeat'

export default function MarioKart() {
  const prefersReducedMotion = useReducedMotion()
  const [gameState, setGameState] = useState<GameState>('intro')
  const [progress, setProgress] = useState(0)
  const [andreaProgress, setAndreaProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const gameRef = useRef<HTMLDivElement>(null)
  const clickCount = useRef(0)
  const lastClickTime = useRef(0)

  const startGame = () => {
    setGameState('playing')
    setProgress(0)
    setAndreaProgress(0)
    clickCount.current = 0
    setMessage(copy.marioKart.messages.start)
  }

  const handleClick = () => {
    if (gameState !== 'playing') return

    const now = Date.now()
    if (now - lastClickTime.current < 100) return // Debounce
    lastClickTime.current = now
    clickCount.current++

    // Andrea advances slightly
    setAndreaProgress(prev => Math.min(prev + 3 + Math.random() * 2, 95))

    // Ismael always stays ahead
    setProgress(prev => {
      const newProgress = prev + 4 + Math.random() * 3
      return Math.min(newProgress, 100)
    })
  }

  // Auto-advance Ismael and create tension
  useEffect(() => {
    if (gameState !== 'playing') return

    const interval = setInterval(() => {
      setProgress(prev => {
        // Keep Ismael always ahead
        if (prev < 100) {
          const newProgress = prev + 0.5
          return Math.min(newProgress, 100)
        }
        return prev
      })

      // Update message based on Andrea's progress
      if (andreaProgress > 30 && andreaProgress < 50 && message !== copy.marioKart.messages.middle) {
        setMessage(copy.marioKart.messages.middle)
      } else if (andreaProgress > 70 && andreaProgress < 85 && message !== copy.marioKart.messages.almostWin) {
        setMessage(copy.marioKart.messages.almostWin)
      } else if (andreaProgress > 85 && message !== copy.marioKart.messages.nearEnd) {
        setMessage(copy.marioKart.messages.nearEnd)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [gameState, andreaProgress, message])

  // Check for game end
  useEffect(() => {
    if (gameState === 'playing' && progress >= 100) {
      setTimeout(() => setGameState('defeat'), 500)
    }
  }, [progress, gameState])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    startGame()
  }

  const getRetryMessage = () => {
    const messages = copy.marioKart.defeat.retryMessages
    return messages[Math.min(retryCount, messages.length - 1)]
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="mariokart">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
            style={{
              color: 'var(--color-accent-red)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(-2deg)'
            }}
          >
            {copy.marioKart.title}
          </h2>
          <h3
            className="text-xl sm:text-2xl font-bold"
            style={{
              color: 'var(--color-accent-yellow)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.marioKart.subtitle}
          </h3>
          <p
            className="text-sm mt-2"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {copy.marioKart.spoiler}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <motion.div
                className="p-6 rounded-lg mb-8"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '2px solid var(--color-border)'
                }}
              >
                {copy.marioKart.intro.map((line, i) => (
                  <p
                    key={i}
                    className={line === '' ? 'h-4' : 'mb-1'}
                    style={{
                      color: line.includes('guanyar')
                        ? 'var(--color-accent-red)'
                        : 'var(--color-text)'
                    }}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}
              </motion.div>

              <motion.button
                onClick={startGame}
                className="px-8 py-4 text-xl font-bold rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-red) 0%, var(--color-accent-yellow) 100%)',
                  color: 'white',
                  fontFamily: 'var(--font-impact)'
                }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {copy.marioKart.startButton} 🏎️
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              ref={gameRef}
              className="select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClick}
            >
              {/* Race track */}
              <div
                className="relative h-40 rounded-lg mb-6 overflow-hidden cursor-pointer"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '3px solid var(--color-border)'
                }}
              >
                {/* Track lines */}
                <div className="absolute inset-0 flex flex-col justify-around">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-px bg-[--color-border] opacity-50" />
                  ))}
                </div>

                {/* Finish line */}
                <div
                  className="absolute right-4 top-0 bottom-0 w-2"
                  style={{
                    background: 'repeating-linear-gradient(0deg, white 0px, white 10px, black 10px, black 20px)'
                  }}
                />

                {/* Ismael's kart */}
                <motion.div
                  className="absolute top-6 text-4xl"
                  style={{ left: `${Math.min(progress, 85)}%` }}
                  animate={{ x: [0, 2, -2, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  🏎️
                </motion.div>

                {/* Andrea's kart */}
                <motion.div
                  className="absolute bottom-6 text-4xl"
                  style={{ left: `${Math.min(andreaProgress, 80)}%` }}
                  animate={{ y: [0, -2, 2, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  🚗
                </motion.div>

                {/* Labels */}
                <span className="absolute top-2 left-2 text-xs text-[--color-text-muted]">Ismael</span>
                <span className="absolute bottom-2 left-2 text-xs text-[--color-text-muted]">Andrea</span>
              </div>

              {/* Click instruction */}
              <motion.p
                className="text-center text-lg font-bold mb-4"
                style={{ color: 'var(--color-accent-yellow)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ¡CLICA PER ACCELERAR! 👆
              </motion.p>

              {/* Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-4 rounded-lg"
                  style={{
                    background: 'var(--color-purple-muted)',
                    fontFamily: 'var(--font-comic)'
                  }}
                >
                  {message}
                </motion.div>
              </AnimatePresence>

              {/* Progress bars */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm w-16">Ismael:</span>
                  <div className="flex-1 h-3 rounded-full bg-[--color-bg-highlight]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--color-kaki)', width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-16">Andrea:</span>
                  <div className="flex-1 h-3 rounded-full bg-[--color-bg-highlight]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--color-purple)', width: `${andreaProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'defeat' && (
            <motion.div
              key="defeat"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="p-8 rounded-lg"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '3px solid var(--color-accent-red)'
                }}
              >
                <motion.h3
                  className="text-4xl font-bold mb-2"
                  style={{
                    color: 'var(--color-accent-red)',
                    fontFamily: 'var(--font-impact)'
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {copy.marioKart.defeat.title}
                </motion.h3>
                <p className="text-lg mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  {copy.marioKart.defeat.subtitle}
                </p>

                {copy.marioKart.defeat.text.map((line, i) => (
                  <p
                    key={i}
                    className={`${line === '' ? 'h-4' : 'mb-1'} ${line.startsWith('•') ? 'pl-4' : ''}`}
                    style={{
                      color: line.includes('Mario Kart')
                        ? 'var(--color-accent-yellow)'
                        : 'var(--color-text)'
                    }}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <motion.button
                    onClick={handleRetry}
                    className="px-6 py-3 rounded-lg font-bold"
                    style={{
                      background: 'var(--color-accent-red)',
                      color: 'white',
                      fontFamily: 'var(--font-comic)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copy.marioKart.defeat.retryButton}
                  </motion.button>
                  <motion.button
                    onClick={() => setGameState('intro')}
                    className="px-6 py-3 rounded-lg"
                    style={{
                      background: 'var(--color-bg-highlight)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copy.marioKart.defeat.acceptButton}
                  </motion.button>
                </div>

                {retryCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-sm"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {getRetryMessage()}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative */}
      <motion.div
        className="absolute -right-5 top-20 text-7xl opacity-10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        🏁
      </motion.div>
    </section>
  )
}
