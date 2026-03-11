'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { CartDrawer } from './CartDrawer'
import { useCart } from '@/lib/CartContext'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart, totalItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-black h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
          CARDS AGAINST HUMANITY
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className="font-bold text-sm tracking-tight hover:underline">
            Product
          </Link>
          <Link href="/about" className="font-bold text-sm tracking-tight hover:underline">
            About
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ShoppingCart size={22} strokeWidth={2.5} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart?.items || []}
      />
    </nav>
  )
}
