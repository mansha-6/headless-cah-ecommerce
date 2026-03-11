'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { medusa } from '@/lib/medusa'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  title: string
  price: number
  imageUrl?: string
  slug: string
}

export const ProductCard = ({ title, price, imageUrl, slug }: ProductCardProps) => {
  const { addItem } = useCart()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    
    try {
      // 1. Get the product from Medusa to find its variant
      const { products } = await medusa.store.product.list({ handle: slug })
      const medusaProduct = products[0]
      
      if (medusaProduct && medusaProduct.variants?.length > 0) {
        const variantId = medusaProduct.variants[0].id
        await addItem(variantId, 1)
        alert('Added to your collection of mistakes!')
      } else {
        alert('No variants available for this product.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to add to cart. Are you sure you are horrible enough?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -10, rotateX: 2, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex flex-col items-center p-8 bg-white border border-black/5 hover:border-black/20 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-3xl"
    >
      <Link href={`/products/${slug}`} className="w-full">
        <div className="relative aspect-square w-full mb-8 overflow-hidden rounded-2xl bg-[#f8f8f8]">
          <Image 
            src="/cah_main_game_render_1773166392747.png" 
            alt={title} 
            fill 
            className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="text-center w-full px-2">
          <h3 className="text-2xl font-black uppercase mb-2 tracking-tighter italic">{title}</h3>
          <p className="text-lg font-bold opacity-40 mb-6 italic tracking-tight">${(price / 100).toFixed(2)}</p>
        </div>
      </Link>
      
      <button 
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full py-4 bg-black text-white font-black uppercase rounded-full hover:bg-black/80 transition-all text-sm tracking-widest active:scale-95 shadow-xl disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </motion.div>
  )
}
