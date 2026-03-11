import { Navbar } from '../../_components/Navbar'
import Image from 'next/image'
import { Plus, Minus, MoveRight, Star } from 'lucide-react'
import { getProduct } from '@/lib/cms'
import Link from 'next/link'
import { Footer } from '../../_components/Footer'

const FALLBACK_PRODUCT = {
  title: 'Classic Game',
  price: 2500,
  description: "This is the main game. If you don't have this, you are basic.",
  bullets: [
    "600 fresh cards (500 white, 100 black).",
    "Includes game rules and a set of instructions.",
    "Best way to lose friends and alienate people.",
    "Compatible with all expansion packs."
  ],
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const cmsProduct = await getProduct(slug)
  const product = cmsProduct || FALLBACK_PRODUCT
  const bullets = (product as any).bullets || FALLBACK_PRODUCT.bullets

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-16">
        {/* Left: Sticky Image Section */}
        <div className="bg-[#f0f0f0] flex items-center justify-center p-8 md:p-12 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-hidden">
           <div className="relative w-full max-w-lg aspect-square">
              <Image 
                src="/cah_main_game_render_1773166392747.png" 
                alt={product.title} 
                fill 
                className="object-contain drop-shadow-2xl"
                priority
              />
              {/* Floating icon for extra polish */}
              <div className="absolute top-0 right-0 p-4 bg-black text-white rounded-full rotate-12 font-black text-xs uppercase tracking-tighter">
                 Most Wanted
              </div>
           </div>
        </div>

        {/* Right: Content Section */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white border-l border-black/5">
           <div className="max-w-xl">
              <nav className="flex items-center gap-3 text-[10px] font-black uppercase opacity-30 mb-8 tracking-widest">
                 <Link href="/" className="hover:opacity-100 transition-opacity">Store</Link>
                 <span className="opacity-20">/</span>
                 <span className="text-black opacity-100">Main Game</span>
              </nav>

              <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tighter leading-tight italic">
                 {product.title}.
              </h1>

              <div className="space-y-6 mb-12">
                 {bullets.map((bullet: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                       <span className="font-black text-2xl mt-[-4px]">•</span>
                       <p className="font-bold text-xl md:text-2xl leading-snug opacity-90">{bullet}</p>
                    </div>
                 ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                 {/* Quantity Selector */}
                 <div className="flex items-center border-4 border-black rounded-full overflow-hidden w-full sm:w-auto">
                    <button className="px-6 py-4 hover:bg-black hover:text-white transition-colors border-r-2 border-black"><Minus size={24} strokeWidth={3} /></button>
                    <span className="w-16 text-center font-black text-2xl px-2">1</span>
                    <button className="px-6 py-4 hover:bg-black hover:text-white transition-colors border-l-2 border-black"><Plus size={24} strokeWidth={3} /></button>
                 </div>
                 
                 {/* Price */}
                 <div className="text-4xl md:text-5xl font-black italic tracking-tighter">
                    ${(product.price / 100).toFixed(2)}
                 </div>
              </div>

              <button className="group relative w-full py-6 bg-black text-white font-black uppercase text-2xl rounded-full overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                 <span className="relative z-10">Add to my horrible life</span>
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
                 <Star size={12} fill="currentColor" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Free shipping over $25
                 </p>
                 <Star size={12} fill="currentColor" />
              </div>
              
              <div className="mt-16 pt-8 border-t border-black/5">
                 <p className="text-sm font-bold leading-relaxed opacity-50 uppercase tracking-tight">
                    {product.description}
                 </p>
              </div>
           </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
