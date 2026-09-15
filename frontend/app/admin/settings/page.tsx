'use client';
import { useState, useEffect } from 'react';
import { adminGetSettings, adminUpdateShowroomSettings, adminUpdateBusinessSettings } from '../../../lib/api';
import { Button } from '../../../components/ui';

type Tab = 'showroom' | 'website';

export default function AdminSettings() {
  const [tab, setTab] = useState<Tab>('showroom');
  const [showroom, setShowroom] = useState<Record<string, string>>({
    businessName: '', phone: '', whatsapp: '', email: '', address: '', city: '', state: '', pincode: '', googleMapsUrl: '',
  });
  const [business, setBusiness] = useState<Record<string, string>>({
    announcementBar: '', heroHeading: '', heroSubheading: '', heroDescription: '',
    heroCTAPrimary: '', heroCTASecondary: '', footerTagline: '', metaTitle: '', metaDescription: '',
  });
  const [businessBool, setBusinessBool] = useState({ announcementBarVisible: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const token = localStorage.getItem('admin_token') ?? '';
    try {
      const data = await adminGetSettings(token);
      if (data.showroom) {
        setShowroom({
          businessName: data.showroom.businessName ?? '',
          phone: data.showroom.phone ?? '',
          whatsapp: data.showroom.whatsapp ?? '',
          email: data.showroom.email ?? '',
          address: data.showroom.address ?? '',
          city: data.showroom.city ?? '',
          state: data.showroom.state ?? '',
          pincode: data.showroom.pincode ?? '',
          googleMapsUrl: data.showroom.googleMapsUrl ?? '',
        });
      }
      if (data.business) {
        setBusiness({
          announcementBar: data.business.announcementBar ?? '',
          heroHeading: data.business.heroHeading ?? '',
          heroSubheading: data.business.heroSubheading ?? '',
          heroDescription: data.business.heroDescription ?? '',
          heroCTAPrimary: data.business.heroCTAPrimary ?? '',
          heroCTASecondary: data.business.heroCTASecondary ?? '',
          footerTagline: data.business.footerTagline ?? '',
          metaTitle: data.business.metaTitle ?? '',
          metaDescription: data.business.metaDescription ?? '',
        });
        setBusinessBool({ announcementBarVisible: data.business.announcementBarVisible ?? true });
      }
    } catch { /* show defaults */ }
    finally { setLoading(false); }
  }

  async function saveShowroom() {
    const token = localStorage.getItem('admin_token') ?? '';
    setSaving(true); setMsg('');
    try {
      await adminUpdateShowroomSettings(showroom, token);
      setMsg('Showroom settings saved successfully.');
    } catch { setMsg('Error: Failed to save. Please try again.'); }
    finally { setSaving(false); }
  }

  async function saveBusiness() {
    const token = localStorage.getItem('admin_token') ?? '';
    setSaving(true); setMsg('');
    try {
      await adminUpdateBusinessSettings({ ...business, ...businessBool }, token);
      setMsg('Website settings saved successfully.');
    } catch { setMsg('Error: Failed to save. Please try again.'); }
    finally { setSaving(false); }
  }

  const inputClass = "w-full border border-border px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-charcoal transition text-sm";
  const labelClass = "block text-xs uppercase tracking-widest text-charcoal-lt mb-2";

  if (loading) return <div className="max-w-4xl mx-auto py-16 text-center text-charcoal-lt">Loading settings…</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-charcoal mb-1">Settings</h1>
        <p className="text-charcoal-lt text-sm">Changes are reflected immediately on the public website.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {(['showroom', 'website'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setMsg(''); }}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-sans transition-colors border-b-2 -mb-px capitalize ${
              tab === t ? 'border-charcoal text-charcoal' : 'border-transparent text-charcoal-lt hover:text-charcoal'
            }`}
          >
            {t === 'showroom' ? 'Showroom Details' : 'Website Content'}
          </button>
        ))}
      </div>

      {msg && (
        <div className={`mb-6 px-6 py-4 text-sm font-sans border ${msg.startsWith('Error') ? 'border-red-200 text-red-700 bg-red-50' : 'border-green-200 text-green-700 bg-green-50'}`}>
          {msg}
        </div>
      )}

      {tab === 'showroom' && (
        <div className="space-y-6">
          <div className="bg-white border border-border p-8">
            <h2 className="font-serif text-xl text-charcoal mb-6">Business Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className={labelClass}>Business Name</label>
                <input className={inputClass} value={showroom.businessName} onChange={e => setShowroom(p => ({...p, businessName: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input className={inputClass} value={showroom.phone} onChange={e => setShowroom(p => ({...p, phone: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input className={inputClass} placeholder="91XXXXXXXXXX (no +)" value={showroom.whatsapp} onChange={e => setShowroom(p => ({...p, whatsapp: e.target.value}))} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Email Address</label>
                <input type="email" className={inputClass} value={showroom.email} onChange={e => setShowroom(p => ({...p, email: e.target.value}))} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input className={inputClass} value={showroom.address} onChange={e => setShowroom(p => ({...p, address: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input className={inputClass} value={showroom.city} onChange={e => setShowroom(p => ({...p, city: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input className={inputClass} value={showroom.state} onChange={e => setShowroom(p => ({...p, state: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Pincode</label>
                <input className={inputClass} value={showroom.pincode} onChange={e => setShowroom(p => ({...p, pincode: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Google Maps URL</label>
                <input className={inputClass} placeholder="https://maps.google.com/..." value={showroom.googleMapsUrl} onChange={e => setShowroom(p => ({...p, googleMapsUrl: e.target.value}))} />
              </div>
            </div>
          </div>
          <Button variant="primary" size="lg" onClick={saveShowroom} disabled={saving}>
            {saving ? 'Saving…' : 'Save Showroom Details'}
          </Button>
        </div>
      )}

      {tab === 'website' && (
        <div className="space-y-6">
          <div className="bg-white border border-border p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-charcoal">Announcement Bar</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="text-xs uppercase tracking-widest text-charcoal-lt">Visible</span>
                <div
                  onClick={() => setBusinessBool(p => ({...p, announcementBarVisible: !p.announcementBarVisible}))}
                  className={`w-10 h-5 transition-colors cursor-pointer ${businessBool.announcementBarVisible ? 'bg-charcoal' : 'bg-border'} relative`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${businessBool.announcementBarVisible ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            </div>
            <label className={labelClass}>Announcement Text</label>
            <input className={inputClass} value={business.announcementBar} onChange={e => setBusiness(p => ({...p, announcementBar: e.target.value}))} />
            <p className="text-[10px] text-charcoal-lt mt-2">Appears across the top of every page. Separate multiple messages with |</p>
          </div>

          <div className="bg-white border border-border p-8">
            <h2 className="font-serif text-xl text-charcoal mb-6">Homepage Hero</h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Hero Heading</label>
                <input className={inputClass} value={business.heroHeading} onChange={e => setBusiness(p => ({...p, heroHeading: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Hero Subheading (gold italic line)</label>
                <input className={inputClass} value={business.heroSubheading} onChange={e => setBusiness(p => ({...p, heroSubheading: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Hero Description</label>
                <textarea rows={3} className={`${inputClass} resize-none`} value={business.heroDescription} onChange={e => setBusiness(p => ({...p, heroDescription: e.target.value}))} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Primary CTA Button Text</label>
                  <input className={inputClass} value={business.heroCTAPrimary} onChange={e => setBusiness(p => ({...p, heroCTAPrimary: e.target.value}))} />
                </div>
                <div>
                  <label className={labelClass}>Secondary CTA Button Text</label>
                  <input className={inputClass} value={business.heroCTASecondary} onChange={e => setBusiness(p => ({...p, heroCTASecondary: e.target.value}))} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-8">
            <h2 className="font-serif text-xl text-charcoal mb-6">SEO & Meta</h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Footer Tagline</label>
                <input className={inputClass} value={business.footerTagline} onChange={e => setBusiness(p => ({...p, footerTagline: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Page Title (Meta Title)</label>
                <input className={inputClass} value={business.metaTitle} onChange={e => setBusiness(p => ({...p, metaTitle: e.target.value}))} />
              </div>
              <div>
                <label className={labelClass}>Meta Description</label>
                <textarea rows={2} className={`${inputClass} resize-none`} value={business.metaDescription} onChange={e => setBusiness(p => ({...p, metaDescription: e.target.value}))} />
                <p className="text-[10px] text-charcoal-lt mt-2">Keep under 160 characters for best SEO.</p>
              </div>
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={saveBusiness} disabled={saving}>
            {saving ? 'Saving…' : 'Save Website Settings'}
          </Button>
        </div>
      )}
    </div>
  );
}
