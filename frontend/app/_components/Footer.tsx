import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-black py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">
            CARDS AGAINST HUMANITY
          </Link>
          <p className="font-bold text-sm max-w-sm opacity-50 uppercase tracking-tight">
            A party game for horrible people. All rights reserved. 
            No part of this game may be used to make people happy.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase text-xs tracking-widest opacity-30 mb-2">The Game</h4>
          <Link href="/products" className="font-black hover:underline uppercase">Shop</Link>
          <Link href="/about" className="font-black hover:underline uppercase">About</Link>
          <Link href="/faq" className="font-black hover:underline uppercase">FAQ</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase text-xs tracking-widest opacity-30 mb-2">Legal Shit</h4>
          <Link href="/privacy" className="font-black hover:underline uppercase">Privacy</Link>
          <Link href="/terms" className="font-black hover:underline uppercase">Terms</Link>
          <Link href="/safety" className="font-black hover:underline uppercase">Safety</Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] font-black uppercase tracking-widest">
         <div>© 2026 Cards Against Humanity LLC.</div>
         <div className="flex gap-8">
            <Link href="#">Instagram</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">TikTok</Link>
         </div>
      </div>
    </footer>
  )
}
