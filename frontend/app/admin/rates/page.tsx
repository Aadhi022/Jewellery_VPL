'use client';
import { useState, useEffect } from 'react';
import { adminGetRates, adminUpdateRate, adminGetRateHistory } from '../../../lib/api';
import { Button, Badge } from '../../../components/ui';

interface MetalRate {
  id: string;
  metal: string;
  purity: string;
  rate: number;
  updatedAt: string;
  updatedBy?: { name: string };
}

interface RateHistory {
  id: string;
  metal: string;
  purity: string;
  previousRate: number;
  newRate: number;
  changedAt: string;
  changedBy?: { name: string };
}

export default function AdminRates() {
  const [rates, setRates] = useState<MetalRate[]>([]);
  const [history, setHistory] = useState<RateHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRate, setEditingRate] = useState<MetalRate | null>(null);
  const [newRateValue, setNewRateValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const token = localStorage.getItem('admin_token') ?? '';
    setLoading(true);
    try {
      const [ratesData, histData] = await Promise.all([
        adminGetRates(token),
        adminGetRateHistory(token),
      ]);
      setRates(Array.isArray(ratesData) ? ratesData : ratesData.data ?? []);
      setHistory(histData.data ?? []);
    } catch {
      // Show empty state on error
    } finally {
      setLoading(false);
    }
  }

  function openEdit(rate: MetalRate) {
    setEditingRate(rate);
    setNewRateValue(String(rate.rate));
    setSaveError('');
    setSaveSuccess('');
  }

  async function handleSave() {
    if (!editingRate) return;
    const val = parseFloat(newRateValue);
    if (isNaN(val) || val <= 0) { setSaveError('Please enter a valid rate.'); return; }
    setSaving(true);
    setSaveError('');
    try {
      const token = localStorage.getItem('admin_token') ?? '';
      await adminUpdateRate({ metal: editingRate.metal, purity: editingRate.purity, rate: val }, token);
      setSaveSuccess(`${editingRate.purity} ${editingRate.metal} rate updated to ₹${val.toLocaleString('en-IN')}`);
      setEditingRate(null);
      await loadData();
    } catch {
      setSaveError('Failed to update rate. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const rateLabel: Record<string, string> = {
    'GOLD-22K': '22K Gold', 'GOLD-24K': '24K Gold', 'GOLD-18K': '18K Gold', 'SILVER-999': 'Silver (999)',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-charcoal mb-1">Metal Rates</h1>
        <p className="text-charcoal-lt text-sm font-sans">Update today's gold and silver rates. Changes reflect immediately on the public website.</p>
      </div>

      {saveSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 text-sm font-sans">
          ✓ {saveSuccess}
        </div>
      )}

      {/* Rate Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white border border-border p-8 animate-pulse">
              <div className="h-3 bg-cream rounded w-24 mb-4" />
              <div className="h-8 bg-cream rounded w-32 mb-2" />
              <div className="h-3 bg-cream rounded w-40" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {rates.length === 0 ? (
            <div className="col-span-2 bg-white border border-border p-12 text-center text-charcoal-lt">
              No rates configured yet. Add your first rate below.
            </div>
          ) : rates.map(rate => (
            <div key={rate.id} className="bg-white border border-border p-8 relative group">
              <div className="absolute top-4 right-4">
                <Badge variant="outline">{rate.purity}</Badge>
              </div>
              <p className="text-xs uppercase tracking-widest text-charcoal-lt font-sans mb-3">
                {rate.metal}
              </p>
              <p className="font-serif text-4xl text-charcoal mb-1">
                ₹{rate.rate.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-charcoal-lt font-sans mb-6">per gram</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-charcoal-lt uppercase tracking-widest">
                  Updated: {new Date(rate.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => openEdit(rate)}
                  className="text-xs uppercase tracking-widest font-sans border border-gold text-gold px-4 py-2 hover:bg-cream transition-colors"
                >
                  Update Rate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingRate && (
        <div className="fixed inset-0 bg-charcoal/40 flex items-center justify-center z-50 p-4">
          <div className="bg-ivory border border-border w-full max-w-md p-8">
            <h2 className="font-serif text-2xl text-charcoal mb-2">
              Update {editingRate.purity} {editingRate.metal} Rate
            </h2>
            <p className="text-charcoal-lt text-sm mb-6">
              Current rate: <strong className="text-charcoal">₹{editingRate.rate.toLocaleString('en-IN')}</strong> per gram
            </p>
            <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">
              New Rate (₹ per gram)
            </label>
            <input
              type="number"
              value={newRateValue}
              onChange={e => setNewRateValue(e.target.value)}
              className="w-full border border-border px-4 py-3 text-charcoal font-sans text-lg focus:outline-none focus:border-charcoal transition mb-4"
              autoFocus
            />
            {saveError && <p className="text-red-600 text-sm mb-4">{saveError}</p>}
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleSave} disabled={saving} className="flex-1">
                {saving ? 'Updating...' : 'Confirm Update'}
              </Button>
              <Button variant="secondary" onClick={() => setEditingRate(null)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rate History */}
      <div className="bg-white border border-border">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-serif text-2xl text-charcoal">Rate History</h2>
          <span className="text-xs uppercase tracking-widest text-charcoal-lt">Last 30 changes</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-cream text-[10px] uppercase tracking-widest text-charcoal-lt">
              <tr>
                <th className="px-6 py-4 font-normal">Metal</th>
                <th className="px-6 py-4 font-normal">Previous</th>
                <th className="px-6 py-4 font-normal">New Rate</th>
                <th className="px-6 py-4 font-normal">Changed By</th>
                <th className="px-6 py-4 font-normal">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-charcoal-lt">No rate history yet.</td></tr>
              ) : history.map(h => (
                <tr key={h.id} className="hover:bg-cream/30">
                  <td className="px-6 py-4">
                    <span className="uppercase tracking-wide">{h.metal}</span>
                    <span className="ml-2 text-charcoal-lt">{h.purity}</span>
                  </td>
                  <td className="px-6 py-4 text-charcoal-lt">₹{h.previousRate.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-charcoal font-medium">₹{h.newRate.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-charcoal-lt">{h.changedBy?.name ?? '—'}</td>
                  <td className="px-6 py-4 text-charcoal-lt">
                    {new Date(h.changedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
