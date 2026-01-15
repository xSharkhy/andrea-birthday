import { motion } from 'motion/react'
import { copy } from '@/data/copy'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[--color-border]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          className="text-sm mb-2"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {copy.footer.text}
        </motion.p>

        <motion.p
          className="text-xs mb-4"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-mono)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {copy.footer.copyright}
        </motion.p>

        <motion.p
          className="text-sm font-bold"
          style={{
            color: 'var(--color-kaki)',
            fontFamily: 'var(--font-comic)'
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {copy.footer.ps}
        </motion.p>

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 px-4 py-2 text-sm rounded-lg"
          style={{
            background: 'var(--color-bg-surface)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)'
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {copy.ui.backToTop}
        </motion.button>

        {/* Hidden easter egg trigger */}
        <div
          className="mt-8 text-2xl cursor-help opacity-30 hover:opacity-100 transition-opacity"
          title="🥔"
        >
          🥔
        </div>
      </div>
    </footer>
  )
}
