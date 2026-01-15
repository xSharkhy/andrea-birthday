import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import EasterEggContent from './EasterEggContent'
import { copy } from '@/data/copy'

type EasterEggType = keyof typeof copy.easterEggs

interface FloatingElement {
  id: string
  emoji: string
  eggType?: EasterEggType
  style: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    fontSize: string
    rotation: number
  }
  animation: 'float' | 'spin' | 'wobble' | 'pulse'
}

const floatingElements: FloatingElement[] = [
  // Easter eggs amb contingut - Originals (mides augmentades per a mòbil)
  { id: 'cadira', emoji: '🪑', eggType: 'cadira', style: { top: '15%', right: '3%', fontSize: '2.5rem', rotation: 15 }, animation: 'wobble' },
  { id: 'girasol', emoji: '🌻', eggType: 'girasol', style: { top: '40%', left: '2%', fontSize: '2.2rem', rotation: -10 }, animation: 'float' },
  { id: 'amapola', emoji: '🌺', eggType: 'amapola', style: { bottom: '30%', right: '5%', fontSize: '2rem', rotation: 8 }, animation: 'pulse' },
  { id: 'patrisi', emoji: '🐧', eggType: 'patrisi', style: { bottom: '15%', left: '3%', fontSize: '2.5rem', rotation: -5 }, animation: 'wobble' },
  { id: 'hollow', emoji: '🐛', eggType: 'hollowKnight', style: { top: '60%', right: '2%', fontSize: '1.8rem', rotation: 20 }, animation: 'float' },
  { id: 'palau', emoji: '🏟️', eggType: 'palauSantJordi', style: { top: '25%', left: '4%', fontSize: '2rem', rotation: -15 }, animation: 'pulse' },

  // Easter eggs nous
  { id: 'viRoin', emoji: '🍷', eggType: 'viRoin', style: { top: '50%', left: '6%', fontSize: '1.8rem', rotation: 25 }, animation: 'spin' },
  { id: 'animalCrossing', emoji: '🎮', eggType: 'animalCrossing', style: { bottom: '25%', right: '10%', fontSize: '2rem', rotation: -20 }, animation: 'float' },
  { id: 'creilles', emoji: '🥔', eggType: 'creilles', style: { top: '75%', left: '5%', fontSize: '1.8rem', rotation: 10 }, animation: 'wobble' },
  { id: 'paella', emoji: '🥘', eggType: 'paella', style: { bottom: '40%', left: '4%', fontSize: '2rem', rotation: -12 }, animation: 'pulse' },
  { id: 'vanGogh', emoji: '🎨', eggType: 'vanGogh', style: { top: '35%', right: '4%', fontSize: '1.8rem', rotation: 8 }, animation: 'float' },
  { id: 'latinos', emoji: '💔', eggType: 'latinos', style: { bottom: '55%', right: '6%', fontSize: '1.6rem', rotation: -15 }, animation: 'pulse' },
  { id: 'antifeixista', emoji: '✊', eggType: 'antifeixista', style: { top: '20%', left: '8%', fontSize: '1.8rem', rotation: 5 }, animation: 'wobble' },
  { id: 'mirada', emoji: '👀', eggType: 'mirada', style: { top: '55%', right: '7%', fontSize: '1.6rem', rotation: -8 }, animation: 'float' },
  { id: 'dali', emoji: '💩', eggType: 'dali', style: { bottom: '10%', right: '15%', fontSize: '1.5rem', rotation: 30 }, animation: 'spin' },

  // Elements decoratius sense contingut (per més caos)
  { id: 'deco1', emoji: '✨', style: { top: '10%', left: '15%', fontSize: '1rem', rotation: 0 }, animation: 'pulse' },
  { id: 'deco2', emoji: '🎵', style: { top: '70%', left: '12%', fontSize: '1.2rem', rotation: 12 }, animation: 'float' },
  { id: 'deco3', emoji: '🎪', style: { bottom: '50%', right: '12%', fontSize: '1.4rem', rotation: -8 }, animation: 'wobble' },
]

export default function EasterEggsContainer() {
  const [openEgg, setOpenEgg] = useState<EasterEggType | null>(null)
  const [chaosMode, setChaosMode] = useState(false)

  // Random chaos burst every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setChaosMode(true)
      setTimeout(() => setChaosMode(false), 2000)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const getAnimation = (type: FloatingElement['animation'], isChaos: boolean) => {
    const base = {
      float: {
        y: [0, -15, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      },
      spin: {
        rotate: [0, 360],
        transition: { duration: 8, repeat: Infinity, ease: 'linear' }
      },
      wobble: {
        rotate: [-5, 5, -5],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      },
      pulse: {
        scale: [1, 1.2, 1],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
    }

    if (isChaos) {
      return {
        ...base[type],
        x: [0, Math.random() * 20 - 10, 0],
        scale: [1, 1.3, 0.9, 1.1, 1],
        transition: { duration: 0.5, repeat: 3 }
      }
    }

    return base[type]
  }

  return (
    <>
      {/* Floating elements scattered around */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className={`fixed z-30 ${el.eggType ? 'cursor-pointer' : 'pointer-events-none'}`}
          style={{
            ...el.style,
            fontSize: el.style.fontSize,
            opacity: el.eggType ? 0.8 : 0.15,
            transform: `rotate(${el.style.rotation}deg)`,
            // Àrea de toc més gran per a mòbil
            padding: el.eggType ? '0.5rem' : 0,
            margin: el.eggType ? '-0.5rem' : 0,
          }}
          animate={getAnimation(el.animation, chaosMode)}
          whileHover={el.eggType ? { scale: 1.3, opacity: 1 } : undefined}
          whileTap={el.eggType ? { scale: 0.9 } : undefined}
          onClick={() => el.eggType && setOpenEgg(el.eggType)}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Random chaos text that appears occasionally */}
      <AnimatePresence>
        {chaosMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
            style={{
              fontFamily: 'var(--font-comic)',
              fontSize: '3rem',
              color: 'var(--color-purple)',
              textShadow: '2px 2px 0 var(--color-kaki)'
            }}
          >
            WASKATRASKA
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for easter egg content */}
      <AnimatePresence>
        {openEgg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={() => setOpenEgg(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -15, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 15, y: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-[calc(100%-2rem)] p-6 rounded-lg"
              style={{
                background: 'var(--color-bg-surface)',
                border: '3px solid var(--color-purple)',
                boxShadow: '8px 8px 0 var(--color-kaki)'
              }}
            >
              <EasterEggContent type={openEgg} />
              <motion.button
                onClick={() => setOpenEgg(null)}
                className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
                style={{
                  background: 'var(--color-accent-pink)',
                  color: 'white',
                  border: '3px solid white'
                }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Tancar"
              >
                ✕
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
