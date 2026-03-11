import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/CartContext'

export const metadata: Metadata = {
  title: 'Cards Against Humanity',
  description: 'A party game for horrible people.',
  keywords: ['party game', 'cards against humanity', 'horrible people', 'game'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
