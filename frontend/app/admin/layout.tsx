'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '⊞' },
  { label: 'Products', href: '/admin/products', icon: '◈' },
  { label: 'Categories', href: '/admin/categories', icon: '⊟' },
  { label: 'Collections', href: '/admin/collections', icon: '◉' },
  { label: 'Rates', href: '/admin/rates', icon: '◎' },
  { label: 'Enquiries', href: '/admin/enquiries', icon: '◻' },
  { label: 'Settings', href: '/admin/settings', icon: '◈' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  
  useEffect(() => {
    if (pathname === '/admin/login') { setReady(true); return; }
    const token = localStorage.getItem('admin_token')
    if (!token) { router.replace('/admin/login'); return; }
    setReady(true)
  }, [pathname, router])
  
  if (!ready) return null
  if (pathname === '/admin/login') return <>{children}</>
  
  function logout() {
    localStorage.removeItem('admin_token')
    router.replace('/admin/login')
  }
  
  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="w-60 bg-white border-r border-border flex flex-col fixed h-full">
        <div className="p-6 border-b border-border">
          <span className="font-serif text-xl text-charcoal">Heritage Jewellers</span>
          <p className="text-xs uppercase tracking-widest text-charcoal-lt mt-1">Admin</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-sans uppercase tracking-wide transition-colors ${
                pathname.startsWith(item.href) 
                  ? 'text-charcoal border-l-2 border-gold bg-cream' 
                  : 'text-charcoal-lt hover:text-charcoal hover:bg-cream'
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="p-6 text-xs uppercase tracking-widest text-charcoal-lt hover:text-charcoal border-t border-border text-left transition">
          Sign Out
        </button>
      </aside>
      <main className="ml-60 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
