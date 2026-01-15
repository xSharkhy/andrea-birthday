import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  scaleInBouncy,
  getScrollAnimationProps,
  defaultViewport
} from '@/lib/animations'

const photos = [
  {
    id: 'concert',
    src: '/photos/sevilla.jpg',
    caption: copy.gallery.captions.festival,
    rotation: -3
  },
  {
    id: 'alone',
    src: '/photos/andrea.jpg',
    caption: copy.gallery.captions.alone,
    rotation: 2
  },
  {
    id: 'baby',
    src: '/photos/baby.jpg',
    caption: copy.gallery.captions.baby,
    rotation: -2
  },
  {
    id: 'meme',
    src: '/photos/festival.jpg',
    caption: copy.gallery.captions.meme,
    rotation: 4
  }
]

export default function Gallery() {
  const prefersReducedMotion = useReducedMotion()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1)
    }
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  return (
    <section className="py-20 px-4 relative" id="gallery">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-purple)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(1deg)'
            }}
          >
            {copy.gallery.title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.gallery.subtitle}
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-sm mb-12 max-w-md mx-auto"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-mono)'
          }}
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          {copy.gallery.disclaimer}
        </motion.p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative cursor-pointer group"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              {...getScrollAnimationProps(scaleInBouncy, prefersReducedMotion, defaultViewport)}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(index)}
            >
              {/* Polaroid frame */}
              <div
                className="p-2 pb-12 rounded-sm shadow-lg"
                style={{ background: 'white' }}
              >
                {/* Photo */}
                <div className="aspect-square rounded-sm overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption */}
                <p
                  className="absolute bottom-2 left-2 right-2 text-xs text-center"
                  style={{
                    color: '#333',
                    fontFamily: 'var(--font-comic)'
                  }}
                >
                  {photo.caption}
                </p>
              </div>

              {/* Tape decoration */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4"
                style={{
                  background: index % 2 === 0 ? 'var(--color-accent-yellow)' : 'var(--color-kaki)',
                  opacity: 0.8,
                  transform: `rotate(${(index % 2 === 0 ? -5 : 5)}deg)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.p
          className="text-center text-sm mt-8"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-mono)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          * clica per a veure més gran *
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setSelectedIndex(null)}
            />

            {/* Botó tancar */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed top-4 right-4 z-[60] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              style={{
                background: 'var(--color-accent-pink)',
                color: 'white',
                border: '3px solid white'
              }}
              onClick={() => setSelectedIndex(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Tancar"
            >
              ✕
            </motion.button>

            {/* Fletxa esquerra */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: 'var(--color-purple)',
                color: 'white',
                border: '2px solid white'
              }}
              onClick={goToPrevious}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Foto anterior"
            >
              ←
            </motion.button>

            {/* Fletxa dreta */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: 'var(--color-purple)',
                color: 'white',
                border: '2px solid white'
              }}
              onClick={goToNext}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Foto següent"
            >
              →
            </motion.button>

            {/* Foto */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-[90vw]"
              onClick={() => setSelectedIndex(null)}
            >
              <div
                className="p-4 pb-16 rounded-sm shadow-2xl"
                style={{ background: 'white' }}
              >
                <div className="w-80 max-w-full aspect-square rounded-sm overflow-hidden">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-4 left-4 right-4 text-center"
                  style={{
                    color: '#333',
                    fontFamily: 'var(--font-comic)'
                  }}
                >
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>

            {/* Indicador de posició */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex gap-2"
            >
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i) }}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    background: i === selectedIndex ? 'var(--color-purple)' : 'white',
                    opacity: i === selectedIndex ? 1 : 0.5,
                    transform: i === selectedIndex ? 'scale(1.3)' : 'scale(1)'
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decorative */}
      <motion.div
        className="absolute -left-10 top-1/3 text-6xl opacity-10"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        📷
      </motion.div>
    </section>
  )
}
