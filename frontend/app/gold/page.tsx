'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Badge } from '../../components/ui';

export default function GoldPage() {
  const [loading, setLoading] = useState(false);

  const categories = ['Chains', 'Rings', 'Bangles', 'Necklaces', 'Haarams', 'Earrings', 'Pendants', 'Mangalsutras'];

  return (
    <div className="min-h-screen bg-ivory">
      <div className="py-16 text-center px-6 border-b border-border">
        <div className="text-xs font-sans uppercase tracking-widest text-charcoal-lt mb-4">
          <Link href="/" className="hover:text-gold">Home</Link> <span className="mx-2">/</span> Gold
        </div>
        <h1 className="text-5xl font-serif text-charcoal">Gold Jewellery</h1>
      </div>

      <div className="max-w-8xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <h3 className="font-serif text-2xl mb-6">Categories</h3>
          <div className="flex flex-wrap lg:flex-col gap-3">
            {categories.map(c => (
              <Link key={c} href={`/gold/${c.toLowerCase()}`} className="text-sm font-sans uppercase tracking-widest text-charcoal border border-border px-4 py-2 hover:border-gold hover:text-gold transition-colors text-center lg:text-left">
                {c}
              </Link>
            ))}
          </div>
          
          <h3 className="font-serif text-2xl mt-12 mb-6">Sort By</h3>
          <select className="w-full bg-transparent border border-border rounded-none px-4 py-3 text-sm font-sans uppercase tracking-widest outline-none focus:border-gold">
            <option>Newest Arrivals</option>
            <option>Weight: Low to High</option>
            <option>Weight: High to Low</option>
          </select>
        </aside>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex flex-col border border-border group cursor-pointer bg-white">
              <div className="aspect-square bg-cream relative overflow-hidden">
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors"></div>
              </div>
              <div className="p-6 text-center">
                <Badge variant="outline" className="mb-3 inline-block">Gold • 22K</Badge>
                <h3 className="text-xl font-serif text-charcoal mb-2">Antique Gold Necklace</h3>
                <p className="text-[10px] text-charcoal-lt uppercase tracking-widest mb-4">42.5g • BIS 916</p>
                <p className="font-serif text-lg text-charcoal mb-6">Price on Enquiry</p>
                <Link href="/products/sku-123"><Button variant="secondary" className="w-full text-xs">View Details</Button></Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
