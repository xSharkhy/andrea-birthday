import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { copy } from '@/data/copy'

// February 18, 2021 - the day she gave him her phone number
const START_DATE = new Date('2021-02-18T00:00:00')

interface TimeUnit {
  value: number
  label: string
}

export default function FriendshipCounter() {
  const [timeElapsed, setTimeElapsed] = useState<TimeUnit[]>([])
  const [funFact, setFunFact] = useState('')

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()

      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const years = Math.floor(days / 365)
      const months = Math.floor((days % 365) / 30)
      const remainingDays = days % 30

      setTimeElapsed([
        { value: years, label: 'anys' },
        { value: months, label: 'mesos' },
        { value: remainingDays, label: 'dies' },
        { value: hours % 24, label: 'hores' },
        { value: minutes % 60, label: 'minuts' },
        { value: seconds % 60, label: 'segons' }
      ])

      // Random fun fact
      const facts = copy.counter.funFacts
      setFunFact(facts[Math.floor(Math.random() * facts.length)])
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="counter">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
            style={{
              color: 'var(--color-kaki)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.counter.title}
          </h2>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {copy.counter.subtitle}
          </p>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {timeElapsed.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="text-center p-4 rounded-lg min-w-[80px]"
              style={{
                background: 'var(--color-bg-surface)',
                border: `2px solid ${index < 3 ? 'var(--color-purple)' : 'var(--color-kaki)'}`,
                boxShadow: index < 3 ? '4px 4px 0 var(--color-kaki)' : 'none'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.p
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  color: index < 3 ? 'var(--color-purple)' : 'var(--color-kaki)',
                  fontFamily: 'var(--font-mono)'
                }}
                key={unit.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.p>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {unit.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Origin story */}
        <motion.div
          className="text-center mb-8 p-6 rounded-lg mx-auto max-w-md"
          style={{
            background: 'var(--color-bg-surface)',
            border: '2px dashed var(--color-purple)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            {copy.counter.origin.label}
          </p>
          <p
            className="font-bold"
            style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-comic)' }}
          >
            {copy.counter.origin.date}
          </p>
          <p className="text-sm mt-2 italic" style={{ color: 'var(--color-text-muted)' }}>
            {copy.counter.origin.note}
          </p>
        </motion.div>

        {/* Fun fact */}
        <motion.p
          className="text-center text-sm italic"
          style={{ color: 'var(--color-kaki)', fontFamily: 'var(--font-comic)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {funFact}
        </motion.p>
      </div>

      {/* Decorative */}
      <motion.div
        className="absolute -left-10 top-1/2 text-8xl opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        ⏰
      </motion.div>
    </section>
  )
}
