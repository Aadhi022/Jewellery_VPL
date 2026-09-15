import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex flex-col">
      {/* Dark Bar */}
      <div className="bg-[#1A1A1A] text-ivory py-16 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Visit Our Showroom</h2>
        <p className="font-sans text-sm text-ivory/80 mb-8 max-w-md mx-auto">Discover our curated jewellery collections in person with dedicated one-on-one attention.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/appointment" className="font-sans text-xs uppercase tracking-widest border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-ivory transition-colors">Book Private Viewing</Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest bg-ivory text-charcoal px-8 py-3 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Light Footer */}
      <div className="bg-ivory border-t border-border pt-16 pb-8 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl text-charcoal mb-4">Heritage Jewellers</h3>
            <p className="font-sans text-sm text-charcoal-lt mb-6">Crafted with love.<br/>Trusted for generations.</p>
            <p className="font-sans text-sm text-charcoal-lt leading-relaxed">123 Heritage Marg,<br/>Jewellery District,<br/>Chennai - 600001, Tamil Nadu</p>
          </div>
          <div className="flex flex-col space-y-4 font-sans text-sm text-charcoal-lt">
            <h4 className="text-charcoal uppercase tracking-widest font-semibold mb-2">Explore</h4>
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <Link href="/gold" className="hover:text-gold transition-colors">Gold</Link>
            <Link href="/silver" className="hover:text-gold transition-colors">Silver</Link>
            <Link href="/diamond" className="hover:text-gold transition-colors">Diamond</Link>
            <Link href="/collections" className="hover:text-gold transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col space-y-4 font-sans text-sm text-charcoal-lt">
            <h4 className="text-charcoal uppercase tracking-widest font-semibold mb-2">Our Jewellery</h4>
            <Link href="/gold/chains" className="hover:text-gold transition-colors">Chains</Link>
            <Link href="/gold/rings" className="hover:text-gold transition-colors">Rings</Link>
            <Link href="/gold/bangles" className="hover:text-gold transition-colors">Bangles</Link>
            <Link href="/gold/necklaces" className="hover:text-gold transition-colors">Necklaces</Link>
            <Link href="/diamond/earrings" className="hover:text-gold transition-colors">Earrings</Link>
            <Link href="/collections/bridal" className="hover:text-gold transition-colors">Bridal</Link>
            <Link href="/collections/temple" className="hover:text-gold transition-colors">Temple</Link>
          </div>
          <div className="flex flex-col space-y-4 font-sans text-sm text-charcoal-lt">
            <h4 className="text-charcoal uppercase tracking-widest font-semibold mb-2">Contact</h4>
            <p>Phone: +91 98765 43210</p>
            <p>WhatsApp: +91 98765 43210</p>
            <p>Email: hello@heritagejewellers.com</p>
            <div className="mt-4">
              <h5 className="text-charcoal uppercase tracking-widest text-xs font-semibold mb-1">Opening Hours</h5>
              <p>Mon - Sat: 10:30 AM - 8:00 PM</p>
              <p>Sunday: 11:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-8xl mx-auto border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-charcoal-lt">
          <p>&copy; {new Date().getFullYear()} Heritage Jewellers. All rights reserved.</p>
          <p>All prices are indicative. GST applicable.</p>
        </div>
      </div>
    </footer>
  );
}
