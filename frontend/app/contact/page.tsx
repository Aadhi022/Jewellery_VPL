'use client';
import { useState } from 'react';
import { submitEnquiry } from '../../lib/api';
import { Button, GoldDivider } from '../../components/ui';

export default function ContactPage() {
  const [form, setForm] = useState({ customerName: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone) { setError('Mobile number is required.'); return; }
    setLoading(true);
    setError('');
    try {
      await submitEnquiry({ ...form, type: 'GENERAL' });
      setSuccess(true);
    } catch {
      setError('Failed to send message. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  }

  const HOURS = [
    { day: 'Monday – Friday', time: '10:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 6:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page Header */}
      <section className="bg-cream border-b border-border py-16 px-6">
        <div className="max-w-8xl mx-auto">
          <span className="text-gold uppercase tracking-widest text-xs">Get in Touch</span>
          <GoldDivider className="my-4" />
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">Contact Us</h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT: Showroom Info */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-8">Our Showroom</h2>
            
            <div className="space-y-8">
              <div className="border-l-2 border-gold pl-6">
                <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">Address</p>
                <p className="text-charcoal font-sans leading-relaxed">
                  [Your Showroom Address]<br />
                  [City, State – Pincode]
                </p>
                <a
                  href="#"
                  className="text-gold text-xs uppercase tracking-widest mt-2 inline-block hover:text-gold-dk transition"
                >
                  Get Directions →
                </a>
              </div>

              <div className="border-l-2 border-gold pl-6">
                <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">Phone</p>
                <a href="tel:+919876543210" className="text-charcoal hover:text-gold transition font-sans">
                  +91 98765 43210
                </a>
              </div>

              <div className="border-l-2 border-gold pl-6">
                <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">WhatsApp</p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-gold transition font-sans"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="border-l-2 border-gold pl-6">
                <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-3">Opening Hours</p>
                <table className="w-full text-sm font-sans">
                  <tbody className="divide-y divide-border">
                    {HOURS.map(h => (
                      <tr key={h.day}>
                        <td className="py-2 text-charcoal-lt pr-6">{h.day}</td>
                        <td className="py-2 text-charcoal text-right">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-2">Send a Message</h2>
            <p className="text-charcoal-lt text-sm mb-8">We'll get back to you within 24 hours.</p>

            {success ? (
              <div className="bg-cream border border-border p-10 text-center">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ivory text-xl">✓</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">Message Sent</h3>
                <p className="text-charcoal-lt text-sm">
                  Thank you! Our team will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      className="w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">
                      Mobile <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-sans">{error}</p>
                )}

                <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
