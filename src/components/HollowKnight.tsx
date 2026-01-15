import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useCallback } from 'react'
import { copy } from '@/data/copy'

type GameState = 'idle' | 'playing' | 'defeat'

export default function HollowKnight() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [playerHP, setPlayerHP] = useState(100)
  const [bossHP, setBossHP] = useState(100)
  const [message, setMessage] = useState('')
  const [attackCount, setAttackCount] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  const startGame = () => {
    setGameState('playing')
    setPlayerHP(100)
    setBossHP(100)
    setMessage(copy.hollowKnight.messages.start)
    setAttackCount(0)
    setIsPlayerTurn(true)
  }

  const attack = useCallback(() => {
    if (!isPlayerTurn || gameState !== 'playing') return

    setIsPlayerTurn(false)
    setAttackCount(prev => prev + 1)

    // Player attack - does tiny damage
    const playerDamage = Math.floor(Math.random() * 3) + 1 // 1-3 damage lol
    setBossHP(prev => {
      const newHP = Math.max(0, prev - playerDamage)

      // Boss never actually dies
      if (newHP < 10) {
        setMessage(copy.hollowKnight.messages.bossLowHP)
        return 15 // Boss "heals" when low
      }
      return newHP
    })

    // Set attack message
    const attackMessages = copy.hollowKnight.messages.playerAttack
    setMessage(attackMessages[Math.floor(Math.random() * attackMessages.length)])

    // Boss counter-attack after delay
    setTimeout(() => {
      if (gameState !== 'playing') return

      const bossDamage = Math.floor(Math.random() * 25) + 15 // 15-40 damage
      setPlayerHP(prev => {
        const newHP = Math.max(0, prev - bossDamage)

        if (newHP <= 0) {
          setGameState('defeat')
          setMessage('')
          return 0
        }

        // Boss attack message
        const bossMessages = copy.hollowKnight.messages.bossAttack
        setMessage(bossMessages[Math.floor(Math.random() * bossMessages.length)])

        return newHP
      })

      setIsPlayerTurn(true)
    }, 800)
  }, [isPlayerTurn, gameState])

  const heal = useCallback(() => {
    if (!isPlayerTurn || gameState !== 'playing') return

    setIsPlayerTurn(false)

    // Healing is... not great
    const healAmount = Math.floor(Math.random() * 5) + 1 // 1-5 HP lol
    setPlayerHP(prev => Math.min(100, prev + healAmount))
    setMessage(copy.hollowKnight.messages.heal[Math.floor(Math.random() * copy.hollowKnight.messages.heal.length)])

    // Boss attacks anyway
    setTimeout(() => {
      if (gameState !== 'playing') return

      const bossDamage = Math.floor(Math.random() * 30) + 20 // Extra damage for trying to heal
      setPlayerHP(prev => {
        const newHP = Math.max(0, prev - bossDamage)

        if (newHP <= 0) {
          setGameState('defeat')
          setMessage('')
          return 0
        }

        setMessage(copy.hollowKnight.messages.bossInterrupt)
        return newHP
      })

      setIsPlayerTurn(true)
    }, 600)
  }, [isPlayerTurn, gameState])

  const retry = () => {
    setRetryCount(prev => prev + 1)
    startGame()
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing' && isPlayerTurn) {
        if (e.key === 'z' || e.key === 'Z') attack()
        if (e.key === 'x' || e.key === 'X') heal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, isPlayerTurn, attack, heal])

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="hollow-knight">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-text-bright)',
              fontFamily: 'var(--font-mono)',
              textShadow: '2px 2px 0 var(--color-purple)'
            }}
          >
            {copy.hollowKnight.title}
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-comic)' }}
          >
            {copy.hollowKnight.subtitle}
          </p>
        </motion.div>

        {/* Game Area */}
        <motion.div
          className="relative p-8 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
            border: '3px solid var(--color-purple)',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {copy.hollowKnight.intro.map((line, i) => (
                  <p
                    key={i}
                    className={line === '' ? 'h-4' : 'mb-2'}
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {line}
                  </p>
                ))}
                <motion.button
                  onClick={startGame}
                  className="mt-6 px-8 py-3 rounded font-bold text-lg"
                  style={{
                    background: 'var(--color-purple)',
                    color: 'white',
                    fontFamily: 'var(--font-mono)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copy.hollowKnight.startButton}
                </motion.button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Boss */}
                <div className="text-center mb-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      y: [0, -5, 0],
                      rotate: isPlayerTurn ? 0 : [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5, repeat: isPlayerTurn ? Infinity : 0 }}
                  >
                    🐛
                  </motion.div>
                  <p className="font-bold mb-2" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-mono)' }}>
                    BOSS FINAL
                  </p>
                  <div className="w-full max-w-xs mx-auto h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-surface)' }}>
                    <motion.div
                      className="h-full"
                      style={{ background: 'var(--color-accent-red)' }}
                      animate={{ width: `${bossHP}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {bossHP}% HP (bàsicament invencible)
                  </p>
                </div>

                {/* Message */}
                <div className="text-center mb-8 h-12">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={message}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-lg"
                      style={{ color: 'var(--color-accent-yellow)', fontFamily: 'var(--font-comic)' }}
                    >
                      {message}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Player */}
                <div className="text-center mb-6">
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{
                      x: isPlayerTurn ? 0 : [-5, 5, -5, 0],
                      opacity: playerHP < 30 ? [1, 0.5, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    🗡️
                  </motion.div>
                  <p className="font-bold mb-2" style={{ color: 'var(--color-kaki)', fontFamily: 'var(--font-mono)' }}>
                    ANDREA
                  </p>
                  <div className="w-full max-w-xs mx-auto h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-surface)' }}>
                    <motion.div
                      className="h-full"
                      style={{ background: playerHP < 30 ? 'var(--color-accent-red)' : 'var(--color-kaki)' }}
                      animate={{ width: `${playerHP}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {playerHP}% HP
                  </p>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <motion.button
                    onClick={attack}
                    disabled={!isPlayerTurn}
                    className="px-6 py-3 rounded font-bold"
                    style={{
                      background: isPlayerTurn ? 'var(--color-kaki)' : 'var(--color-bg-surface)',
                      color: isPlayerTurn ? 'white' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}
                    whileHover={isPlayerTurn ? { scale: 1.05 } : {}}
                    whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
                  >
                    [Z] ATACAR
                  </motion.button>
                  <motion.button
                    onClick={heal}
                    disabled={!isPlayerTurn}
                    className="px-6 py-3 rounded font-bold"
                    style={{
                      background: isPlayerTurn ? 'var(--color-purple)' : 'var(--color-bg-surface)',
                      color: isPlayerTurn ? 'white' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}
                    whileHover={isPlayerTurn ? { scale: 1.05 } : {}}
                    whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
                  >
                    [X] CURAR
                  </motion.button>
                </div>

                <p className="text-center mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Intents d'atac: {attackCount}
                </p>
              </motion.div>
            )}

            {gameState === 'defeat' && (
              <motion.div
                key="defeat"
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.h3
                  className="text-3xl font-bold mb-4"
                  style={{ color: 'var(--color-accent-red)', fontFamily: 'var(--font-impact)' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  {copy.hollowKnight.defeat.title}
                </motion.h3>
                <p className="mb-6" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-comic)' }}>
                  {copy.hollowKnight.defeat.subtitle}
                </p>

                {copy.hollowKnight.defeat.text.map((line, i) => (
                  <p
                    key={i}
                    className={line === '' ? 'h-4' : 'mb-1'}
                    style={{ color: line.startsWith('•') ? 'var(--color-kaki)' : 'var(--color-text-muted)' }}
                  >
                    {line}
                  </p>
                ))}

                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    onClick={retry}
                    className="px-6 py-3 rounded font-bold"
                    style={{
                      background: 'var(--color-purple)',
                      color: 'white',
                      fontFamily: 'var(--font-mono)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copy.hollowKnight.defeat.retryButton}
                  </motion.button>
                </div>

                {retryCount > 0 && (
                  <p className="mt-4 text-sm" style={{ color: 'var(--color-accent-yellow)' }}>
                    {copy.hollowKnight.defeat.retryMessages[Math.min(retryCount - 1, copy.hollowKnight.defeat.retryMessages.length - 1)]}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Decorative bugs */}
      <motion.div
        className="absolute left-10 top-20 text-4xl opacity-20"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🐛
      </motion.div>
      <motion.div
        className="absolute right-10 bottom-20 text-3xl opacity-20"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        🦋
      </motion.div>
    </section>
  )
}
