'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Badge, GoldDivider } from '../../../components/ui';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg'];

  return (
    <div className="bg-ivory min-h-screen py-12 md:py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          <div className="w-full aspect-[4/5] bg-cream border border-border flex items-center justify-center overflow-hidden">
            <span className="text-gold-lt uppercase tracking-widest text-xs">Primary Image</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square bg-cream border ${selectedImage === idx ? 'border-gold' : 'border-border'} flex items-center justify-center`}
              >
                <span className="text-gold-lt text-[10px]">Thumb {idx+1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[45%] flex flex-col items-start">
          <Badge variant="outline" className="mb-6">Bridal • Gold</Badge>
          
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-2">Heritage Antique Necklace</h1>
          <p className="text-xs font-sans text-charcoal-lt uppercase tracking-widest mb-6">SKU: GR-1025</p>
          
          <GoldDivider className="mb-6" />
          
          <p className="text-charcoal-md font-sans leading-relaxed mb-8">
            An exquisite antique finish necklace crafted with extreme precision, featuring intricate temple motifs that celebrate South Indian heritage. Perfect for bridal trousseaus and milestone occasions.
          </p>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 w-full">
            <div className="border-b border-border pb-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-lt block mb-1">Material</span>
              <span className="text-sm">Gold</span>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-lt block mb-1">Purity</span>
              <span className="text-sm">916 22K</span>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-lt block mb-1">Weight</span>
              <span className="text-sm">45.5g</span>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-lt block mb-1">Certification</span>
              <span className="text-sm text-gold">BIS Hallmark</span>
            </div>
          </div>
          
          <div className="border border-border p-6 mb-8 w-full text-center bg-cream/30">
             <p className="text-2xl font-serif text-charcoal mb-1">Price on Enquiry</p>
             <p className="text-[10px] uppercase tracking-widest text-charcoal-lt">Connect with us for current pricing</p>
          </div>
          
          <div className="flex flex-col gap-4 w-full">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-full block">
              <Button variant="primary" className="w-full bg-[#1A1A1A]">Enquire on WhatsApp</Button>
            </a>
            <Link href="/appointment" className="w-full block">
              <Button variant="secondary" className="w-full">Book an Appointment</Button>
            </Link>
          </div>
          
          <p className="text-xs italic text-charcoal-lt mt-6 w-full text-center">
            Availability subject to showroom confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
