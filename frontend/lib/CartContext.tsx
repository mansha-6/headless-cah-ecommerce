'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { medusa } from '@/lib/medusa'

interface CartContextType {
  cart: any
  addItem: (variantId: string, quantity: number) => Promise<void>
  refreshCart: () => Promise<void>
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>(null)

  const refreshCart = async () => {
    const cartId = localStorage.getItem('cart_id')
    if (cartId) {
      try {
        const { cart } = await medusa.store.cart.retrieve(cartId)
        setCart(cart)
      } catch (e) {
        localStorage.removeItem('cart_id')
        createCart()
      }
    } else {
      createCart()
    }
  }

  const createCart = async () => {
    const { cart } = await medusa.store.cart.create()
    localStorage.setItem('cart_id', cart.id)
    setCart(cart)
  }

  const addItem = async (variantId: string, quantity: number) => {
    const cartId = localStorage.getItem('cart_id')
    if (!cartId) return

    const { cart } = await medusa.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    })
    setCart(cart)
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const totalItems = cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0

  return (
    <CartContext.Provider value={{ cart, addItem, refreshCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
