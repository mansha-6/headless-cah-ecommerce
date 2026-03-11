'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Card {
  text: string
  type: 'black' | 'white'
}

interface HeroProps {
  title?: string
  cards: Card[]
}

const FloatingCard = ({ card, index }: { card: Card; index: number }) => {
  const [initialPos] = useState({
    x: Math.random() * 1000 - 500,
    y: Math.random() * 700 - 350,
    rotate: Math.random() * 90 - 45
  })

  return (
    <motion.div
      initial={initialPos}
      animate={{ 
        x: [initialPos.x, Math.random() * 1000 - 500], 
        y: [initialPos.y, Math.random() * 700 - 350], 
        rotate: [initialPos.rotate, Math.random() * 90 - 45]
      }}
      transition={{ 
        duration: 20 + Math.random() * 20, 
        repeat: Infinity, 
        repeatType: 'mirror',
        ease: "linear"
      }}
      drag
      dragConstraints={{ left: -800, right: 800, top: -500, bottom: 500 }}
      whileDrag={{ scale: 1.15, zIndex: 100, rotate: 0 }}
      className={`absolute w-36 h-48 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
        card.type === 'black' 
          ? 'bg-black text-white border-[1px] border-white/20' 
          : 'bg-white text-black border border-black/5'
      }`}
      style={{
        zIndex: index,
      }}
    >
      <p className="text-sm font-black leading-tight tracking-tight italic uppercase">{card.text}</p>
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 opacity-40">
         <div className="w-4 h-4 border-2 border-current rounded-full" />
         <span className="text-[9px] font-black uppercase tracking-tighter">Cards Against Humanity</span>
      </div>
    </motion.div>
  )
}

export const Hero = ({ title, cards }: HeroProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create a larger set of cards for a fuller feel
  const displayCards = [...cards, ...cards, ...cards].slice(0, 15)

  return (
    <div className="relative w-full h-[90vh] bg-black overflow-hidden flex flex-col items-center justify-center p-10 cursor-default">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Scattered Cards */}
      {mounted && displayCards.map((card, index) => (
        <FloatingCard key={index} card={card} index={index} />
      ))}

      {/* Hero Title */}
      <div className="relative z-50 text-center pointer-events-none select-none">
        {title && (
          <h1 className="text-7xl md:text-[10rem] font-black text-white mix-blend-difference uppercase tracking-tighter italic leading-none">
            {title}
          </h1>
        )}
        <p className="text-white font-black uppercase tracking-[0.4em] text-xs mt-4 opacity-50 mix-blend-difference">
          A party game for horrible people.
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
         <div className="w-px h-12 bg-white animate-pulse" />
      </div>
    </div>
  )
}
