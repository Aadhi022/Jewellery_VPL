import Link from 'next/link';
import { SectionHeading, Button, GoldDivider, Badge } from '../components/ui';

export default function Home() {
  const rates = [
    { name: '22K Gold', price: '7,450' },
    { name: '24K Gold', price: '7,850' },
    { name: '18K Gold', price: '6,100' },
    { name: 'Silver', price: '92' }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="bg-ivory py-20 px-6 lg:py-32 flex flex-col md:flex-row items-center max-w-8xl mx-auto gap-12">
        <div className="w-full md:w-[60%] flex flex-col items-start text-left">
          <span className="text-gold uppercase tracking-widest text-xs mb-4">HERITAGE JEWELLERY</span>
          <GoldDivider className="mb-8" />
          <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-4">Timeless Jewellery.</h1>
          <p className="text-2xl md:text-3xl font-serif italic text-gold mb-8">Trusted Tradition.</p>
          <p className="text-charcoal-lt max-w-md font-sans mb-10 leading-relaxed">
            Discover our curated collection of heritage pieces crafted for generations. From antique gold to brilliant diamonds, find the perfect piece to celebrate life's most precious moments.
          </p>
          <div className="flex gap-4">
            <Link href="/collections"><Button variant="primary">Explore Collections</Button></Link>
            <Link href="/appointment"><Button variant="secondary">Book Appointment</Button></Link>
          </div>
        </div>
        <div className="w-full md:w-[40%] aspect-[4/5] bg-cream border border-border flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-4 border border-gold/30 z-10 transition-transform group-hover:scale-95 duration-500"></div>
          <span className="text-gold-lt uppercase tracking-widest text-xs text-center z-10">Editorial Hero Image</span>
        </div>
      </section>

      <section className="border-y border-border py-8 px-6 bg-ivory">
        <div className="max-w-8xl mx-auto flex flex-wrap justify-center md:justify-between gap-8 text-xs uppercase tracking-widest text-charcoal-md font-sans">
          <div className="flex items-center gap-2"><span className="text-gold">✦</span> BIS Hallmarked</div>
          <div className="flex items-center gap-2"><span className="text-gold">✦</span> HUID Certified</div>
          <div className="flex items-center gap-2"><span className="text-gold">✦</span> IGI/GIA Diamonds</div>
          <div className="flex items-center gap-2"><span className="text-gold">✦</span> 100% Exchange</div>
        </div>
      </section>

      <section className="bg-lavender-gray py-24 px-6">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3">
            <SectionHeading align="left" heading="Today's Precious Metal Rates" subheading="Transparent daily rates updated straight from the bullion market." />
            <p className="mt-6 text-xs text-charcoal-lt uppercase tracking-widest">Updated: 15 Sep 2026</p>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {rates.map(r => (
              <div key={r.name} className="bg-ivory border border-border p-6 flex flex-col relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold"></div>
                <Badge variant="outline" className="w-fit mb-4">{r.name}</Badge>
                <div className="text-3xl font-serif text-charcoal mb-1">₹{r.price}</div>
                <div className="text-xs text-charcoal-lt font-sans uppercase tracking-widest">per gram</div>
              </div>
            ))}
          </div>
        </div>
        <p className="max-w-8xl mx-auto text-center mt-12 text-xs italic text-charcoal-lt">Rates are indicative. Making charges, wastage, and taxes are calculated separately.</p>
      </section>

      <section className="py-24 px-6 max-w-8xl mx-auto w-full">
        <SectionHeading eyebrow="Explore" heading="Our Collections" subheading="Browse our signature styles, categorised by material and craftsmanship." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {['Chains', 'Rings', 'Necklaces', 'Bridal'].map((cat, i) => (
            <Link href={`/gold/${cat.toLowerCase()}`} key={i} className="group cursor-pointer block">
              <div className="aspect-[4/5] bg-cream border border-border mb-4 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-charcoal opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                 <span className="text-gold-lt font-sans text-xs uppercase tracking-widest">Image</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-1">{cat}</h3>
              <p className="text-charcoal-lt text-xs uppercase tracking-widest group-hover:text-gold transition-colors">Explore →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 border-t border-border bg-ivory">
        <div className="max-w-8xl mx-auto w-full">
          <SectionHeading eyebrow="Featured" heading="Signature Masterworks" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col border border-border">
                <div className="aspect-square bg-cream flex items-center justify-center">Image</div>
                <div className="p-6 text-center">
                  <Badge variant="gold" className="mb-4 inline-block">Gold • 22K</Badge>
                  <h3 className="text-2xl font-serif text-charcoal mb-2">Heritage Necklace {i}</h3>
                  <p className="text-xs text-charcoal-lt uppercase tracking-widest mb-4">45.5g • BIS Hallmarked</p>
                  <p className="text-lg font-serif text-charcoal mb-6">Price on Enquiry</p>
                  <div className="flex flex-col gap-2">
                    <Link href="/products/sku-123"><Button variant="secondary" className="w-full">Details</Button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender-gray py-24 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading align="left" eyebrow="Investment" heading="Swarna Savings Scheme" subheading="Plan your future purchases with our secure gold savings scheme. Pay for 11 months and get the 12th month's instalment free." />
            <Link href="/savings-scheme"><Button variant="primary" className="mt-10">Enquire Now</Button></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { no: '01', title: 'Join Scheme', desc: 'Select a monthly amount.' },
               { no: '02', title: 'Save Monthly', desc: 'Pay for 11 months securely.' },
               { no: '03', title: 'Receive Bonus', desc: 'Get 12th month instalment free.' },
               { no: '04', title: 'Redeem', desc: 'Purchase your jewellery.' }
             ].map((step, i) => (
               <div key={i} className="bg-ivory p-6 border border-border">
                 <span className="text-gold text-sm font-sans mb-4 block">{step.no}</span>
                 <h4 className="text-xl font-serif text-charcoal mb-2">{step.title}</h4>
                 <p className="text-charcoal-lt text-sm">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1C1C1C] py-24 px-6 text-center text-ivory">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Schedule a Private Viewing</h2>
        <p className="max-w-xl mx-auto text-ivory/80 font-sans mb-10">Experience our collection with dedicated one-on-one attention from our expert consultants.</p>
        <Link href="/appointment"><Button variant="gold" className="px-10">Book an Appointment</Button></Link>
      </section>
    </div>
  );
}
