'use client';
import { useState, useEffect } from 'react';
import { adminGetEnquiries, adminUpdateEnquiryStatus } from '../../../lib/api';
import { Badge } from '../../../components/ui';

interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  type: string;
  status: string;
  message: string;
  notes?: string;
  productCode?: string;
  preferredDate?: string;
  preferredTime?: string;
  createdAt: string;
}

const STATUS_OPTS = ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CLOSED'];
const STATUS_COLORS: Record<string, 'gold' | 'outline' | 'charcoal'> = {
  NEW: 'gold', CONTACTED: 'outline', FOLLOW_UP: 'outline', CLOSED: 'charcoal',
};
const TYPE_TABS = ['ALL', 'GENERAL', 'PRODUCT', 'APPOINTMENT', 'PAWN_LOAN'];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('ALL');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const token = localStorage.getItem('admin_token') ?? '';
    setLoading(true);
    try {
      const data = await adminGetEnquiries({}, token);
      setEnquiries(data.data ?? data ?? []);
    } catch { setEnquiries([]); }
    finally { setLoading(false); }
  }

  async function updateStatus(id: string, status: string) {
    const token = localStorage.getItem('admin_token') ?? '';
    setUpdatingId(id);
    try {
      await adminUpdateEnquiryStatus(id, status, token);
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    } catch { /* show error */ }
    finally { setUpdatingId(null); }
  }

  const filtered = tab === 'ALL' ? enquiries : enquiries.filter(e => e.type === tab);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-charcoal mb-1">Enquiries</h1>
        <p className="text-charcoal-lt text-sm">Manage customer enquiries and appointment requests.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {TYPE_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-xs uppercase tracking-widest font-sans transition-colors border-b-2 -mb-px ${
              tab === t ? 'border-charcoal text-charcoal' : 'border-transparent text-charcoal-lt hover:text-charcoal'
            }`}
          >
            {t === 'ALL' ? 'All' : t.replace('_', ' ')}
            {t === 'ALL' && <span className="ml-2 bg-cream text-charcoal-lt px-1.5 py-0.5 text-[10px]">{enquiries.length}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white border border-border p-6 animate-pulse">
              <div className="h-3 bg-cream rounded w-48 mb-3" />
              <div className="h-3 bg-cream rounded w-32" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-border p-16 text-center text-charcoal-lt font-sans">
          No enquiries found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(enq => (
            <div key={enq.id} className="bg-white border border-border">
              {/* Row */}
              <div
                className="p-6 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-cream/30 transition-colors"
                onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-sans text-charcoal font-medium">{enq.customerName}</span>
                    <Badge variant={enq.type === 'APPOINTMENT' ? 'charcoal' : 'outline'}>
                      {enq.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-charcoal-lt text-sm font-sans">{enq.phone}{enq.email ? ` · ${enq.email}` : ''}</p>
                </div>

                {enq.productCode && (
                  <span className="text-xs font-sans text-charcoal-lt hidden md:block">#{enq.productCode}</span>
                )}

                <div className="text-xs text-charcoal-lt hidden md:block">
                  {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>

                {/* Status dropdown */}
                <select
                  value={enq.status}
                  onChange={e => { e.stopPropagation(); updateStatus(enq.id, e.target.value); }}
                  onClick={e => e.stopPropagation()}
                  disabled={updatingId === enq.id}
                  className="text-xs uppercase tracking-widest font-sans border border-border px-3 py-2 bg-white focus:outline-none focus:border-charcoal transition cursor-pointer"
                >
                  {STATUS_OPTS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>

                <span className="text-charcoal-lt text-sm">{expanded === enq.id ? '▲' : '▼'}</span>
              </div>

              {/* Expanded Details */}
              {expanded === enq.id && (
                <div className="border-t border-border bg-cream/30 px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">Message</p>
                      <p className="text-charcoal font-sans text-sm leading-relaxed">{enq.message}</p>
                    </div>
                    {(enq.preferredDate || enq.preferredTime) && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">Appointment Preference</p>
                        <p className="text-charcoal font-sans text-sm">
                          {enq.preferredDate}{enq.preferredTime ? ` · ${enq.preferredTime}` : ''}
                        </p>
                      </div>
                    )}
                    {enq.notes && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-charcoal-lt mb-2">Notes</p>
                        <p className="text-charcoal font-sans text-sm">{enq.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest border border-border px-4 py-2 hover:bg-white transition-colors font-sans"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${enq.phone}`}
                      className="text-xs uppercase tracking-widest border border-border px-4 py-2 hover:bg-white transition-colors font-sans"
                    >
                      Call
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
