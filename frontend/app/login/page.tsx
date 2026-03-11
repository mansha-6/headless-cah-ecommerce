'use client'

import { Navbar } from '../_components/Navbar'
import { useState } from 'react'
import { medusa } from '@/lib/medusa'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Medusa 2.0 Auth call
      await medusa.auth.login('customer', 'emailpass', {
        email,
        password
      })
      router.push('/')
    } catch (err) {
      alert('Login failed. You are not horrible enough yet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-16 flex items-center justify-center p-6">
      <Navbar />
      
      <div className="w-full max-w-md border-4 border-black p-8 md:p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter italic">
          Sign In.
        </h1>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-black uppercase mb-2 text-black/40">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:ring-4 focus:ring-black/5"
              placeholder="you@horriblepeople.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase mb-2 text-black/40">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:ring-4 focus:ring-black/5"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-black text-white font-black uppercase text-xl hover:bg-black/80 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Entering...' : 'Enter the Abyss'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
           <button 
             onClick={() => alert('Soul retrieval not supported in this region.')}
             className="text-xs font-black uppercase underline opacity-30 hover:opacity-100 transition-opacity"
           >
              Forgot your soul?
           </button>
        </div>
      </div>
    </main>
  )
}
