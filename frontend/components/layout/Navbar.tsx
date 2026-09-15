'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { cn } from '../ui';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Gold', href: '/gold' },
    { name: 'Silver', href: '/silver' },
    { name: 'Diamond', href: '/diamond' },
    { name: 'Collections', href: '/collections' },
    { name: 'Savings Scheme', href: '/savings-scheme' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={cn('sticky top-0 z-50 bg-ivory transition-all duration-300 border-b border-border', scrolled ? 'shadow-sm backdrop-blur-sm' : '')}>
      <div className="max-w-8xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl md:text-3xl text-charcoal tracking-wide">Heritage Jewellers</Link>
        
        <nav className="hidden lg:flex space-x-8">
          {links.map(l => (
            <Link key={l.name} href={l.href} className={cn('text-sm font-sans uppercase tracking-widest hover:text-gold transition-colors pb-1', pathname === l.href ? 'text-gold border-b border-gold' : 'text-charcoal')}>
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <a href="tel:+919876543210" className="text-charcoal hover:text-gold transition"><Phone size={20} /></a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-charcoal hover:text-green-600 transition"><MessageCircle size={20} /></a>
          <Link href="/appointment" className="text-xs font-sans uppercase tracking-widest border border-charcoal px-5 py-2.5 hover:bg-charcoal hover:text-ivory transition-colors">Book Appointment</Link>
        </div>

        <button className="lg:hidden text-charcoal" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-charcoal/40 backdrop-blur-sm">
          <div className="w-80 bg-ivory h-full shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <span className="font-serif text-xl">Menu</span>
              <button onClick={() => setIsOpen(false)} className="text-charcoal"><X size={28} /></button>
            </div>
            <div className="flex flex-col space-y-6">
              {links.map(l => (
                <Link key={l.name} href={l.href} onClick={() => setIsOpen(false)} className={cn('text-sm font-sans uppercase tracking-widest hover:text-gold transition-colors', pathname === l.href ? 'text-gold' : 'text-charcoal')}>
                  {l.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-border flex flex-col gap-4">
                <Link href="/appointment" onClick={() => setIsOpen(false)} className="text-xs text-center font-sans uppercase tracking-widest border border-charcoal px-5 py-3 hover:bg-charcoal hover:text-ivory transition-colors">Book Appointment</Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-widest bg-[#25D366] text-white px-5 py-3">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
