import { Navbar } from '../_components/Navbar'

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Shipping & Payment */}
        <div className="space-y-12">
           <section>
              <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter">1. Where should we send it?</h2>
              <div className="grid grid-cols-2 gap-4">
                 <input className="col-span-1 border-2 border-black p-4 font-bold" placeholder="FIRST NAME" />
                 <input className="col-span-1 border-2 border-black p-4 font-bold" placeholder="LAST NAME" />
                 <input className="col-span-2 border-2 border-black p-4 font-bold" placeholder="STREET ADDRESS" />
                 <input className="col-span-1 border-2 border-black p-4 font-bold" placeholder="CITY" />
                 <input className="col-span-1 border-2 border-black p-4 font-bold" placeholder="POSTAL CODE" />
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter">2. How will you pay?</h2>
              <div className="border-4 border-black p-6 bg-black text-white">
                 <p className="font-bold mb-4 italic">Test Mode: Just type whatever, we don't care.</p>
                 <div className="space-y-4 text-black">
                    <input className="w-full p-4 font-bold" placeholder="CARD NUMBER" />
                    <div className="grid grid-cols-2 gap-4">
                       <input className="p-4 font-bold" placeholder="MM/YY" />
                       <input className="p-4 font-bold" placeholder="CVC" />
                    </div>
                 </div>
              </div>
           </section>
           
           <button className="w-full py-6 bg-black text-white font-black uppercase text-2xl rounded-full hover:scale-[1.02] transition-transform shadow-2xl">
              Pay $25.00
           </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-[#f2f2f2] p-8 md:p-12 h-fit space-y-8">
           <h2 className="text-2xl font-black uppercase tracking-tighter">Order Summary</h2>
           
           <div className="space-y-4">
              <div className="flex justify-between font-bold">
                 <span>Main Game x 1</span>
                 <span>$25.00</span>
              </div>
              <div className="w-full h-px bg-black/10" />
              <div className="flex justify-between font-bold">
                 <span>Shipping</span>
                 <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold">
                 <span>Tax</span>
                 <span>$0.00</span>
              </div>
              <div className="w-full h-px bg-black" />
              <div className="flex justify-between text-3xl font-black uppercase">
                 <span>Total</span>
                 <span>$25.00</span>
              </div>
           </div>
           
           <div className="bg-white p-4 border-2 border-black italic text-sm font-bold opacity-60">
              "You are about to make a terrible mistake. But we appreciate your patronage."
           </div>
        </div>
      </div>
    </main>
  )
}
