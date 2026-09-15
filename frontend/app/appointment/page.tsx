'use client';
import { useState } from 'react';
import { submitEnquiry } from '../../lib/api';
import { Button, GoldDivider } from '../../components/ui';

const TIME_SLOTS = [
  'Morning (10:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 3:00 PM)',
  'Evening (3:00 PM – 6:00 PM)',
];
const CATEGORIES = ['Gold Jewellery', 'Diamond Jewellery', 'Silver Jewellery', 'Bridal Set', 'Temple Jewellery', 'General Consultation'];

export default function AppointmentPage() {
  const [form, setForm] = useState({
    customerName: '', phone: '', email: '',
    preferredDate: '', preferredTime: '', jewelleryCategory: '',
    consultationFormat: 'In-Store', specialRequests: '', weddingDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone) { setError('Mobile number is required.'); return; }
    setLoading(true); setError('');
    try {
      await submitEnquiry({
        customerName: form.customerName,
        phone: form.phone,
        email: form.email || undefined,
        message: `Appointment Request. Category: ${form.jewelleryCategory}. Format: ${form.consultationFormat}. Special requests: ${form.specialRequests || 'None'}`,
        type: 'APPOINTMENT',
        preferredDate: form.preferredDate || undefined,
        preferredTime: form.preferredTime || undefined,
        jewelleryCategory: form.jewelleryCategory || undefined,
        consultationFormat: form.consultationFormat || undefined,
        specialRequests: form.specialRequests || undefined,
        weddingDate: form.weddingDate || undefined,
      });
      setSuccess(true);
    } catch {
      setError('Unable to submit. Please call us directly or WhatsApp us.');
    } finally { setLoading(false); }
  }

  const inputClass = "w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition text-sm bg-white";
  const labelClass = "block text-xs uppercase tracking-widest text-charcoal-lt mb-2";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="bg-cream border-b border-border py-16 px-6">
        <div className="max-w-8xl mx-auto">
          <span className="text-gold uppercase tracking-widest text-xs">Private Viewing</span>
          <GoldDivider className="my-4" />
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">Book an Appointment</h1>
          <p className="text-charcoal-lt mt-4 max-w-xl font-sans">
            Experience our jewellery collection with undivided attention from our specialists. Appointments available in-store and virtually.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-cream border border-border p-14 text-center">
                <div className="w-14 h-14 bg-charcoal flex items-center justify-center mx-auto mb-6">
                  <span className="text-ivory text-2xl font-serif">✓</span>
                </div>
                <h2 className="font-serif text-3xl text-charcoal mb-3">Request Received</h2>
                <p className="text-charcoal-lt font-sans max-w-md mx-auto">
                  Thank you! Our team will contact you within 24 hours to confirm your appointment.
                </p>
                <p className="text-xs text-charcoal-lt mt-6 font-sans">
                  For urgent queries, WhatsApp us directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div className="bg-white border border-border p-8">
                  <h2 className="font-serif text-xl text-charcoal mb-6">Your Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Full Name <span className="text-gold">*</span></label>
                      <input name="customerName" value={form.customerName} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Mobile Number <span className="text-gold">*</span></label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Email Address</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Appointment Preferences */}
                <div className="bg-white border border-border p-8">
                  <h2 className="font-serif text-xl text-charcoal mb-6">Appointment Preferences</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Preferred Date</label>
                      <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Preferred Time</label>
                      <select name="preferredTime" value={form.preferredTime} onChange={handleChange} className={inputClass}>
                        <option value="">Select a time slot</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Jewellery Category</label>
                      <select name="jewelleryCategory" value={form.jewelleryCategory} onChange={handleChange} className={inputClass}>
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Consultation Format</label>
                      <div className="flex gap-4 pt-3">
                        {['In-Store', 'Virtual'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="consultationFormat"
                              value={opt}
                              checked={form.consultationFormat === opt}
                              onChange={handleChange}
                              className="accent-charcoal"
                            />
                            <span className="text-sm font-sans text-charcoal">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white border border-border p-8">
                  <h2 className="font-serif text-xl text-charcoal mb-6">Additional Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Wedding / Occasion Date (if applicable)</label>
                      <input name="weddingDate" type="date" value={form.weddingDate} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Special Requests or Notes</label>
                      <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} placeholder="E.g. Budget range, specific pieces you'd like to see, accessibility needs…" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-600 text-sm font-sans">{error}</p>}
                <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Submitting…' : 'Request Appointment'}
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-cream border border-border p-8">
              <h3 className="font-serif text-xl text-charcoal mb-5">What to Expect</h3>
              <ul className="space-y-4">
                {[
                  ['Dedicated Specialist', 'Your personal jewellery consultant will guide you through our collections.'],
                  ['No Pressure', 'Our consultations are relaxed. Take all the time you need.'],
                  ['Expert Guidance', 'Get advice on purity, weight, making charges, and certification.'],
                  ['Confirmation', 'We\'ll call or WhatsApp you within 24 hours to confirm your slot.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="text-gold mt-1 flex-shrink-0">✦</span>
                    <div>
                      <p className="font-sans text-charcoal text-sm font-medium">{title}</p>
                      <p className="font-sans text-charcoal-lt text-xs mt-1">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-charcoal p-8 text-ivory">
              <h3 className="font-serif text-xl mb-4">Prefer WhatsApp?</h3>
              <p className="text-sm font-sans text-ivory/80 mb-5">
                Chat with us directly to schedule your visit.
              </p>
              <a
                href="https://wa.me/919876543210?text=I'd like to book an appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest border border-ivory/40 px-5 py-3 hover:bg-ivory hover:text-charcoal transition-colors inline-block"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
