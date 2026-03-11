'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
  id: string
  title: string
  unit_price: number
  quantity: number
  thumbnail?: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
}

export const CartDrawer = ({ isOpen, onClose, items }: CartDrawerProps) => {
  const subtotal = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-black">
              <h2 className="text-2xl font-black uppercase flex items-center gap-2 italic">
                Your Mistakes
                <span className="text-sm opacity-50 font-sans tracking-normal font-bold">({items.length})</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-bold text-xl uppercase italic">Your cart is empty.</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-6 py-2 border-2 border-black font-black uppercase text-sm hover:bg-black hover:text-white transition-colors"
                  >
                    Go buy some cards
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-[#f8f8f8] rounded-xl flex-shrink-0 border border-black/5 p-2">
                       <Image 
                         src="/cah_main_game_render_1773166392747.png" 
                         alt={item.title} 
                         fill 
                         className="object-contain p-2"
                       />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-black uppercase text-lg leading-none italic">{item.title}</h3>
                        <div className="font-black text-lg italic tracking-tighter">${(item.unit_price / 100).toFixed(2)}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border-2 border-black rounded-full px-2 py-1">
                          <button className="p-1 hover:opacity-50 transition-opacity"><Minus size={14} strokeWidth={3} /></button>
                          <span className="w-8 text-center font-black">{item.quantity}</span>
                          <button className="p-1 hover:opacity-50 transition-opacity"><Plus size={14} strokeWidth={3} /></button>
                        </div>
                        <button className="text-[10px] font-black uppercase underline opacity-40 hover:opacity-100 transition-opacity">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-black bg-white">
              <div className="flex justify-between items-end mb-6">
                <span className="font-bold uppercase opacity-60">Subtotal</span>
                <span className="text-4xl font-black italic tracking-tighter">${(subtotal / 100).toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout" 
                onClick={onClose}
                className="block w-full text-center py-5 bg-black text-white font-black uppercase text-xl rounded-full hover:bg-black/80 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Go to Checkout
              </Link>
              
              <p className="mt-4 text-[10px] font-bold opacity-30 text-center uppercase tracking-widest">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
