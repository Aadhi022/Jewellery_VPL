'use client';
import { Button } from '../../components/ui';
import Link from 'next/link';

export default function PawnLoanPage() {
  return (
    <div className="min-h-screen bg-ivory py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-charcoal mb-6">Gold Loan & Pawn Services</h1>
        <p className="text-charcoal-lt mb-12">Secure, transparent, and immediate financial assistance against your gold assets.</p>
        
        <div className="text-left bg-white border border-border p-8 mb-8">
          <h2 className="text-2xl font-serif text-charcoal mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 text-charcoal-lt space-y-2 font-sans">
            <li>Bring your gold jewellery to our showroom.</li>
            <li>Get it assessed by our expert appraisers in minutes.</li>
            <li>Receive your loan amount instantly.</li>
            <li>Repay the loan to reclaim your jewellery securely.</li>
          </ol>
        </div>
        
        <p className="text-xs italic text-charcoal-lt mb-8">
          Contact our branch for current terms, interest rates and eligibility. All products subject to applicable regulations. We do not guarantee specific loan amounts or rates.
        </p>
        
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
          <Button variant="primary">Contact Us to Learn More</Button>
        </a>
      </div>
    </div>
  );
}
