'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '../../../lib/api'
import { Button } from '../../../components/ui'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await adminLogin(email, password)
      localStorage.setItem('admin_token', data.access_token)
      router.push('/admin/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-charcoal mb-2">Heritage Jewellers</h1>
          <p className="text-charcoal-lt text-sm uppercase tracking-widest">Admin Portal</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-border p-8 shadow-sm">
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-border px-4 py-3 text-charcoal font-sans focus:outline-none focus:border-charcoal transition" />
          </div>
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-charcoal-lt mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full border border-border px-4 py-3 text-charcoal font-sans focus:outline-none focus:border-charcoal transition" />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="text-center text-charcoal-lt text-xs mt-6">
          Demo: admin@jewellery.demo / Admin@123
        </p>
      </div>
    </div>
  )
}
