import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { copy } from '@/data/copy'
import {
  fadeInUp,
  scaleInBouncy,
  staggerContainer,
  getScrollAnimationProps,
  defaultViewport,
  chaosEntry
} from '@/lib/animations'

interface QuizState {
  currentQuestion: number
  score: number
  showResult: boolean
  selectedAnswer: number | null
  isCorrect: boolean | null
  showFeedback: boolean
}

export default function Quiz() {
  const prefersReducedMotion = useReducedMotion()
  const [started, setStarted] = useState(false)
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResult: false,
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false
  })

  const currentQ = copy.quiz.questions[state.currentQuestion]

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: index,
      isCorrect,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }))

    // Move to next question after delay
    setTimeout(() => {
      if (state.currentQuestion < copy.quiz.questions.length - 1) {
        setState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null,
          isCorrect: null,
          showFeedback: false
        }))
      } else {
        setState(prev => ({ ...prev, showResult: true }))
      }
    }, 2000)
  }

  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const getResult = () => {
    if (state.score === 5) return copy.quiz.results.perfect
    if (state.score >= 3) return copy.quiz.results.good
    if (state.score >= 1) return copy.quiz.results.okay
    return copy.quiz.results.bad
  }

  const resetQuiz = () => {
    setStarted(false)
    setState({
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null,
      isCorrect: null,
      showFeedback: false
    })
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="quiz">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          {...getScrollAnimationProps(fadeInUp, prefersReducedMotion, defaultViewport)}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: 'var(--color-purple)',
              fontFamily: 'var(--font-impact)',
              transform: 'rotate(-2deg)'
            }}
          >
            {copy.quiz.title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-comic)'
            }}
          >
            {copy.quiz.subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!started ? (
            /* Intro screen */
            <motion.div
              key="intro"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <motion.div
                className="p-8 rounded-lg mb-8"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '2px solid var(--color-border)'
                }}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {copy.quiz.intro.map((line, i) => (
                  <motion.p
                    key={i}
                    className={line === '' ? 'h-4' : 'mb-1'}
                    style={{
                      color: line.includes('decebràs') ? 'var(--color-accent-pink)' : 'var(--color-text)'
                    }}
                    variants={fadeInUp}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}
              </motion.div>

              <motion.button
                onClick={() => setStarted(true)}
                className="px-8 py-4 text-xl font-bold rounded-lg"
                style={{
                  background: 'var(--color-purple)',
                  color: 'white',
                  fontFamily: 'var(--font-comic)'
                }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                ENDAVANT 🎯
              </motion.button>
            </motion.div>
          ) : state.showResult ? (
            /* Results screen */
            <motion.div
              key="result"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="p-8 rounded-lg"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: `3px solid ${state.score >= 3 ? 'var(--color-kaki)' : 'var(--color-accent-pink)'}`
                }}
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {state.score >= 3 ? '🎉' : '😅'}
                </motion.div>

                <h3
                  className="text-3xl font-bold mb-6"
                  style={{
                    color: state.score >= 3 ? 'var(--color-kaki)' : 'var(--color-purple)',
                    fontFamily: 'var(--font-impact)'
                  }}
                >
                  {state.score}/5 - {getResult().title}
                </h3>

                {getResult().text.map((line, i) => (
                  <p
                    key={i}
                    className={line === '' ? 'h-4' : 'mb-1'}
                    style={{ color: 'var(--color-text)' }}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}

                <motion.button
                  onClick={resetQuiz}
                  className="mt-8 px-6 py-3 rounded-lg"
                  style={{
                    background: 'var(--color-bg-highlight)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tornar a intentar-ho
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            /* Question screen */
            <motion.div
              key={`question-${state.currentQuestion}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Progress */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Pregunta {state.currentQuestion + 1}/{copy.quiz.questions.length}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-kaki)' }}>
                  Punts: {state.score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full mb-8" style={{ background: 'var(--color-bg-highlight)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-purple)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((state.currentQuestion + 1) / copy.quiz.questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question */}
              <motion.h3
                className="text-xl sm:text-2xl font-bold mb-8 text-center"
                style={{
                  color: 'var(--color-text-bright)',
                  transform: 'rotate(-1deg)'
                }}
              >
                {currentQ.question}
              </motion.h3>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option, index) => {
                  const isSelected = state.selectedAnswer === index
                  const showCorrect = state.showFeedback && option.correct
                  const showWrong = state.showFeedback && isSelected && !option.correct

                  return (
                    <motion.button
                      key={index}
                      onClick={() => !state.showFeedback && handleAnswer(index, option.correct)}
                      disabled={state.showFeedback}
                      className="w-full text-left p-4 rounded-lg transition-all"
                      style={{
                        background: showCorrect
                          ? 'var(--color-kaki)'
                          : showWrong
                          ? 'var(--color-accent-red)'
                          : 'var(--color-bg-surface)',
                        border: `2px solid ${
                          showCorrect ? 'var(--color-kaki-light)' :
                          showWrong ? 'var(--color-accent-red)' :
                          'var(--color-border)'
                        }`,
                        color: showCorrect || showWrong ? 'white' : 'var(--color-text)',
                        transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 0.5}deg)`
                      }}
                      whileHover={!state.showFeedback ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!state.showFeedback ? { scale: 0.98 } : {}}
                    >
                      <span className="font-bold mr-2" style={{ color: 'var(--color-purple)' }}>
                        {String.fromCharCode(65 + index)})
                      </span>
                      {option.text}
                    </motion.button>
                  )
                })}
              </div>

              {/* Feedback message */}
              <AnimatePresence>
                {state.showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 rounded-lg text-center"
                    style={{
                      background: state.isCorrect ? 'var(--color-kaki-muted)' : 'var(--color-purple-muted)',
                      fontFamily: 'var(--font-comic)'
                    }}
                  >
                    {state.isCorrect
                      ? getRandomMessage(copy.quiz.correctMessages)
                      : getRandomMessage(copy.quiz.incorrectMessages)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative */}
      <motion.div
        className="absolute -left-10 top-1/4 text-8xl opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        ❓
      </motion.div>
    </section>
  )
}
