import { getPage, getProducts } from '@/lib/cms'
import { Navbar } from './_components/Navbar'
import { Hero } from './_components/Hero'
import { ProductCard } from './_components/ProductCard'
import { Footer } from './_components/Footer'

const FALLBACK_DATA = {
  hero: {
    title: "CARDS AGAINST HUMANITY",
    cards: [
      { text: "A big black dick.", type: "black" },
      { text: "A tiny white dick.", type: "white" },
      { text: "Beating your kids.", type: "black" },
      { text: "The American Dream.", type: "white" },
      { text: "Police brutality.", type: "black" },
      { text: "Tofu.", type: "white" },
    ]
  },
}

export default async function HomePage() {
  const page = await getPage('home')
  const products = await getProducts()
  
  // Transform CMS blocks to usable data
  const heroBlock = page?.layout?.find((b: any) => b.blockType === 'hero')
  const heroData = heroBlock || FALLBACK_DATA.hero

  return (
    <main className="min-h-screen bg-white pt-16">
      <Navbar />
      
      <Hero 
        title={heroData.title} 
        cards={heroData.cards || []} 
      />

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-none">
              The game for horrible people.
            </h2>
            <p className="text-lg font-bold opacity-70">
              Unlike most party games, Cards Against Humanity is as despicable and awkward as you and your friends.
            </p>
          </div>
          <button className="px-8 py-4 bg-black text-white font-black uppercase text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
            Shop All Stuff
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(products.length > 0 ? products : [
            { id: '1', title: 'Main Game', price: 2500, slug: 'main-game' },
            { id: '2', title: 'Family Edition', price: 2500, slug: 'family-edition' },
            { id: '3', title: 'Everything Box', price: 2000, slug: 'everything-box' },
            { id: '4', title: 'Absurd Box', price: 2000, slug: 'absurd-box' },
          ]).map((product: any) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>

      {/* Dynamic Content Sections would go here */}
      <section className="bg-black text-white py-32 px-6 text-center">
         <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
            We are digging a giant hole.
         </h2>
         <p className="text-xl font-bold max-w-2xl mx-auto opacity-80 mb-12">
            Why? Because we can. And because you are paying for it.
         </p>
         <div className="flex flex-col md:flex-row justify-center gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="px-6 py-4 bg-white text-black font-bold focus:outline-none w-full md:w-80"
            />
            <button className="px-10 py-4 bg-white text-black font-black uppercase hover:bg-black hover:text-white border-2 border-white transition-colors">
              Join the chaos
            </button>
         </div>
      </section>
      
      <Footer />
    </main>
  )
}
