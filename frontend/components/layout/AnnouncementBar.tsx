'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement_dismissed');
    if (!dismissed) setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    sessionStorage.setItem('announcement_dismissed', 'true');
    setIsVisible(false);
  };

  return (
    <div className="bg-[#1A1A1A] text-ivory text-xs text-center py-2 px-6 uppercase tracking-widest font-sans flex items-center justify-center relative">
      <span className="flex-1 text-center hidden md:inline">BIS 916 Hallmark Certified Gold | Wedding Season Collections | Book a Private Viewing</span>
      <span className="flex-1 text-center md:hidden">BIS 916 Hallmarked | Free Shipping</span>
      <button onClick={handleDismiss} className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
