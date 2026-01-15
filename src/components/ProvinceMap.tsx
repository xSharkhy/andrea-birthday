import { motion } from 'motion/react'
import { useState } from 'react'
import { copy } from '@/data/copy'

// Province positions (percentage of container)
const provincePositions: Record<string, { x: number; y: number; label: string }> = {
  coruna: { x: 12, y: 14, label: 'A Coruña' },
  guipuzkoa: { x: 62, y: 12, label: 'Gipuzkoa' },
  navarra: { x: 68, y: 16, label: 'Navarra' },
  barcelona: { x: 82, y: 26, label: 'Barcelona' },
  tarragona: { x: 76, y: 34, label: 'Tarragona' },
  terol: { x: 66, y: 42, label: 'Terol' },
  castello: { x: 74, y: 52, label: 'Castelló' },
  valencia: { x: 70, y: 62, label: 'València' },
  alacant: { x: 66, y: 74, label: 'Alacant' },
  albacete: { x: 54, y: 58, label: 'Albacete' },
  sevilla: { x: 26, y: 72, label: 'Sevilla' }
}


export default function ProvinceMap() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 relative" id="map">
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
              color: 'var(--color-purple)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(-1deg)'
            }}
          >
            {copy.map.title}
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-comic)' }}
          >
            {copy.map.subtitle}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative mx-auto rounded-lg overflow-hidden"
          style={{
            maxWidth: '600px',
            aspectRatio: '4/5',
            background: 'var(--color-bg-surface)',
            border: '3px solid var(--color-kaki)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >

          {/* Province markers */}
          {Object.entries(provincePositions).map(([key, pos], index) => (
            <motion.div
              key={key}
              className="absolute cursor-pointer"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProvince(key)}
              onMouseLeave={() => setHoveredProvince(null)}
            >
              {/* Pin */}
              <motion.div
                className="relative"
                animate={{
                  y: hoveredProvince === key ? -5 : 0,
                  scale: hoveredProvince === key ? 1.2 : 1
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: hoveredProvince === key ? 'var(--color-purple)' : 'var(--color-kaki)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  📍
                </div>

                {/* Label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-bold"
                  style={{
                    top: '100%',
                    marginTop: '4px',
                    background: 'var(--color-bg-surface)',
                    color: hoveredProvince === key ? 'var(--color-purple)' : 'var(--color-text)',
                    border: `1px solid ${hoveredProvince === key ? 'var(--color-purple)' : 'var(--color-kaki)'}`
                  }}
                  animate={{
                    opacity: hoveredProvince === key ? 1 : 0.7,
                    scale: hoveredProvince === key ? 1.1 : 1
                  }}
                >
                  {pos.label}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}

          {/* Legend */}
          <div
            className="absolute bottom-4 right-4 p-3 rounded"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-kaki)' }}
          >
            <p className="text-xs font-bold" style={{ color: 'var(--color-kaki)' }}>
              {copy.map.legend}
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex gap-8 flex-wrap justify-center">
            {copy.map.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-3xl font-bold"
                  style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-impact)' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fun note */}
        <motion.p
          className="text-center mt-6 text-sm italic"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-comic)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {copy.map.note}
        </motion.p>
      </div>
    </section>
  )
}
