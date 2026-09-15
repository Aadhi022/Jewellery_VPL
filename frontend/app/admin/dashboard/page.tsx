'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '../../../components/ui'

export default function DashboardAdmin() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem('admin_token')
        if (!token) return router.replace('/admin/login')
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const res = await fetch(`${apiUrl}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to load')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [router])

  if (loading) return <div className="p-8 font-sans text-charcoal">Loading dashboard...</div>

  const stats = data?.stats || [
    { label: 'Total Products', value: '0', color: '' },
    { label: 'Available', value: '0', color: 'text-green-600' },
    { label: 'Sold', value: '0', color: 'text-red-600' },
    { label: 'Collections', value: '0', color: '' },
    { label: 'New Enquiries', value: '0', color: 'text-gold' },
    { label: 'Appointments', value: '0', color: '' },
  ];
  const recentEnquiries = data?.recentEnquiries || [];
  const rates = data?.rates || [
    { name: '22K Gold', price: '7,450' },
    { name: '24K Gold', price: '7,850' },
    { name: '18K Gold', price: '6,100' },
    { name: 'Silver', price: '92' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif text-charcoal mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {stats.map((s: any) => (
          <div key={s.label} className="bg-white border border-border p-6 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-charcoal-lt mb-2">{s.label}</p>
            <p className={'text-3xl font-serif ' + (s.color || 'text-charcoal')}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-2xl text-charcoal">Recent Enquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-cream text-xs uppercase tracking-widest text-charcoal-lt">
                <tr>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Customer</th>
                  <th className="px-6 py-4 font-normal">Type</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-charcoal">
                {recentEnquiries.length > 0 ? recentEnquiries.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-cream/50">
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.customer}</td>
                    <td className="px-6 py-4"><Badge variant="outline">{row.type}</Badge></td>
                    <td className="px-6 py-4"><Badge variant={row.status === 'NEW' ? 'gold' : 'outline'}>{row.status}</Badge></td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-charcoal-lt">No recent enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-border shadow-sm p-6 text-charcoal">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl">Today's Rates</h2>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-lt">per gm</span>
          </div>
          <div className="flex flex-col gap-4">
            {rates.map((m: any) => (
              <div key={m.name} className="flex justify-between items-center p-4 border border-border bg-cream/30">
                <span className="text-sm uppercase tracking-widest font-semibold">{m.name}</span>
                <span className="font-serif text-xl">₹{m.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
