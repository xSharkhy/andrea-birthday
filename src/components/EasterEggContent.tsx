import { copy } from '@/data/copy'

type EasterEggType = keyof typeof copy.easterEggs

interface EasterEggContentProps {
  type: EasterEggType
}

export default function EasterEggContent({ type }: EasterEggContentProps) {
  const content = copy.easterEggs[type]

  if (!content) return null

  // Different rendering based on type
  switch (type) {
    case 'latinos':
      return (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-impact)' }}>
            {content.title}
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-4' : 'mb-1'} ${line.startsWith('•') ? 'pl-4' : ''}`} style={{ color: line.startsWith('•') ? 'var(--color-accent-red)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'antifeixista':
      return (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-kaki)', fontFamily: 'var(--font-impact)' }}>
            {content.title}
          </h3>
          <ul className="mb-4">
            {content.items.map((item, i) => (
              <li key={i} className="text-[--color-accent-red] line-through">• {item}</li>
            ))}
          </ul>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'creilles':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-yellow)', fontFamily: 'var(--font-comic)' }}>
            {content.title}
          </h3>
          <div className="mb-4">
            <p className="font-bold mb-2" style={{ color: 'var(--color-kaki)' }}>Formes vàlides:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {content.validForms.map((form, i) => (
                <span key={i} className="px-2 py-1 rounded text-sm" style={{ background: 'var(--color-kaki-muted)' }}>{form}</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold mb-2" style={{ color: 'var(--color-accent-red)' }}>Formes no vàlides:</p>
            {content.invalidForms.map((form, i) => (
              <p key={i} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{form}</p>
            ))}
          </div>
          {content.footer.map((line, i) => (
            <p key={i} className="font-bold" style={{ color: 'var(--color-purple)' }}>{line}</p>
          ))}
        </div>
      )

    case 'cadira':
      return (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-impact)' }}>
            {content.title}
          </h3>
          <div className="mb-4 p-4 rounded" style={{ background: 'var(--color-bg-highlight)' }}>
            <p className="font-bold mb-2">Característiques:</p>
            {content.specs.map((spec, i) => (
              <p key={i} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{spec}</p>
            ))}
          </div>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: line.includes('cadires') ? 'var(--color-kaki)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'hollowKnight':
      return (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-mono)' }}>
            {content.title}
          </h3>
          <div className="mb-4 p-4 rounded font-mono text-sm" style={{ background: 'var(--color-bg-highlight)' }}>
            {content.stats.map((stat, i) => (
              <p key={i} style={{ color: stat.includes('HP') ? 'var(--color-kaki)' : 'var(--color-text)' }}>{stat}</p>
            ))}
          </div>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'palauSantJordi':
      return (
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-accent-yellow)', fontFamily: 'var(--font-mono)' }}>
            {content.title}
          </h3>
          <h4 className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {content.subtitle}
          </h4>
          <div className="mb-4 p-4 rounded font-mono text-sm space-y-1" style={{ background: 'var(--color-bg-highlight)' }}>
            {content.stats.map((stat, i) => (
              <p key={i} style={{ color: stat.includes('Horrible') ? 'var(--color-accent-red)' : stat.includes('Inmillorable') ? 'var(--color-kaki)' : 'var(--color-text)' }}>{stat}</p>
            ))}
          </div>
          {content.footer.map((line, i) => (
            <p key={i} className="text-sm font-bold" style={{ color: line.includes('0') && !line.includes('1.000.000') ? 'var(--color-accent-red)' : 'var(--color-kaki)' }}>{line}</p>
          ))}
        </div>
      )

    case 'vanGogh':
      return (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-accent-yellow)', fontFamily: 'var(--font-impact)' }}>
            {content.title}
          </h3>
          <div className="mb-4 p-4 rounded font-mono text-sm" style={{ background: 'var(--color-bg-highlight)' }}>
            {content.stats.map((stat, i) => (
              <p key={i}>{stat}</p>
            ))}
          </div>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'girasol':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-yellow)', fontFamily: 'var(--font-comic)' }}>
            {content.title}
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'amapola':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-red)', fontFamily: 'var(--font-comic)' }}>
            {content.title}
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: line.includes('cursi') ? 'var(--color-accent-pink)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'patrisi':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-impact)' }}>
            {content.title}
          </h3>
          {content.text.map((line, i) => (
            <p
              key={i}
              className={`${line === '' ? 'h-4' : 'mb-1'} ${line.includes('SIGUES FORT') ? 'text-xl font-bold' : ''}`}
              style={{ color: line.includes('SIGUES FORT') ? 'var(--color-kaki)' : 'var(--color-text)' }}
            >
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'mirada':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-pink)', fontFamily: 'var(--font-comic)' }}>
            👀 LA MIRADA 👀
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: line.includes('cadires') ? 'var(--color-kaki)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'paella':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-orange)', fontFamily: 'var(--font-impact)' }}>
            🥘 {content.title} 🥘
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-4' : 'mb-1'} ${line.includes('ta mare') ? 'font-bold' : ''}`} style={{ color: line.includes('ta mare') ? 'var(--color-accent-yellow)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'animalCrossing':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-kaki)', fontFamily: 'var(--font-comic)' }}>
            🎮 ANIMAL CROSSING 🎮
          </h3>
          <p className="text-lg mb-4 italic" style={{ color: 'var(--color-accent-yellow)' }}>
            {content.sound}
          </p>
          {content.text.map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-4' : 'mb-1'} ${line.includes('préstec') ? 'font-bold' : ''}`} style={{ color: line.includes('préstec') ? 'var(--color-accent-red)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'viRoin':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-red)', fontFamily: 'var(--font-impact)' }}>
            🍷 {content.title} 🍷
          </h3>
          {content.text.map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-4' : 'mb-1'} ${line.includes('sagrat') ? 'text-lg font-bold' : ''}`} style={{ color: line.includes('sagrat') ? 'var(--color-purple)' : 'var(--color-text)' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    case 'dali':
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-red)', fontFamily: 'var(--font-impact)' }}>
            💩 FORA D'ACÍ 💩
          </h3>
          {content.text.map((line, i) => (
            <p
              key={i}
              className={`${line === '' ? 'h-4' : 'mb-1'} ${line.includes('Pedòfil') ? 'font-bold text-lg' : ''}`}
              style={{
                color: line.includes('Pedòfil') ? 'var(--color-accent-red)' :
                       line.includes('principis') ? 'var(--color-kaki)' : 'var(--color-text)',
                textDecoration: line.includes('Dalí') ? 'line-through' : 'none'
              }}
            >
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      )

    default:
      // Generic text-based easter eggs
      if ('text' in content && Array.isArray(content.text)) {
        return (
          <div>
            {'title' in content && (
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-purple)', fontFamily: 'var(--font-impact)' }}>
                {content.title as string}
              </h3>
            )}
            {(content.text as string[]).map((line: string, i: number) => (
              <p key={i} className={line === '' ? 'h-4' : 'mb-1'} style={{ color: 'var(--color-text)' }}>
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        )
      }
      return null
  }
}
