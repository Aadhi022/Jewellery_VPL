import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button.tsx
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'gold' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-charcoal text-ivory hover:bg-charcoal-md',
    secondary: 'bg-ivory text-charcoal border border-border hover:bg-cream',
    gold: 'bg-ivory text-gold border border-gold hover:bg-cream',
    ghost: 'text-charcoal hover:bg-cream'
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };
  return (
    <button ref={ref} className={cn('uppercase tracking-widest font-sans transition-colors duration-300', variants[variant], sizes[size], className)} {...props} />
  );
});
Button.displayName = 'Button';

// SectionHeading.tsx
export function SectionHeading({ eyebrow, heading, subheading, align = 'center' }: { eyebrow?: string, heading: string, subheading?: string, align?: 'left' | 'center' }) {
  return (
    <div className={cn('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
      {eyebrow && <span className="text-gold uppercase tracking-widest text-xs mb-3">{eyebrow}</span>}
      <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">{heading}</h2>
      {subheading && <p className="text-charcoal-lt max-w-2xl text-lg font-sans">{subheading}</p>}
    </div>
  );
}

// Badge.tsx
export function Badge({ children, variant = 'outline', className }: { children: React.ReactNode, variant?: 'gold' | 'charcoal' | 'outline', className?: string }) {
  const variants = {
    gold: 'bg-cream text-gold border-gold',
    charcoal: 'bg-charcoal text-ivory border-charcoal',
    outline: 'bg-transparent text-charcoal border-border'
  };
  return (
    <span className={cn('px-2 py-1 text-[10px] uppercase tracking-widest border', variants[variant], className)}>
      {children}
    </span>
  );
}

// GoldDivider.tsx
export function GoldDivider({ className }: { className?: string }) {
  return <div className={cn('w-10 h-[1px] bg-gold', className)} />;
}

// EmptyState.tsx
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4">
        <span className="text-gold text-2xl font-serif">!</span>
      </div>
      <p className="text-charcoal-md font-sans">{message}</p>
    </div>
  );
}
