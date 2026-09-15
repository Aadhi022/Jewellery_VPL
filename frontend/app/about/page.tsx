'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="py-16 text-center px-6 border-b border-border bg-cream">
        <h1 className="text-5xl font-serif text-charcoal">Our Story</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif text-charcoal mb-6">Heritage & Craftsmanship</h2>
        <p className="text-charcoal-lt font-sans leading-relaxed">
          Generations of trust, master craftsmanship, and purity. Our story is woven in gold and diamonds.
        </p>
      </div>
    </div>
  );
}
