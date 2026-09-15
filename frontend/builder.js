const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(relativePath, content) {
  const filePath = path.join(baseDir, relativePath);
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Created:', relativePath);
}

// 1. Tailwind Config
writeFile('tailwind.config.ts', `
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        cream: '#F5F0E8',
        charcoal: {
          DEFAULT: '#1C1C1C',
          md: '#3A3A3A',
          lt: '#6B6B6B',
        },
        'lavender-gray': '#F0EEF4',
        gold: {
          DEFAULT: '#B8972E',
          lt: '#D4AF6A',
          dk: '#8B6914',
        },
        border: '#E8E2D9',
        'dark-bar': '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
export default config
`);

// 2. Globals CSS
writeFile('app/globals.css', `
@import "tailwindcss";

:root {
  --color-ivory: #FAF7F2;
  --color-cream: #F5F0E8;
  --color-charcoal: #1C1C1C;
  --color-charcoal-md: #3A3A3A;
  --color-charcoal-lt: #6B6B6B;
  --color-lavender-gray: #F0EEF4;
  --color-gold: #B8972E;
  --color-gold-lt: #D4AF6A;
  --color-gold-dk: #8B6914;
  --color-border: #E8E2D9;
  --color-dark-bar: #1A1A1A;
}

body {
  background-color: var(--color-ivory);
  color: var(--color-charcoal);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-cormorant), Georgia, serif;
  font-weight: 400;
}

/* Gold accent divider */
.gold-divider {
  width: 2.5rem;
  height: 1px;
  background-color: var(--color-gold);
}

/* Luxury link */
a {
  color: inherit;
  text-decoration: none;
}

/* Thin scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-ivory); }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }
`);

// 3. Layout
writeFile('app/layout.tsx', `
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AnnouncementBar from '../components/layout/AnnouncementBar'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_META_TITLE || 'Premium Jewellery Showroom',
  description: process.env.NEXT_PUBLIC_META_DESC || 'South Indian Heritage Jewellery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${cormorant.variable} \${inter.variable}\`}>
      <body className="flex flex-col min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
`);

// 4. API Lib
writeFile('lib/api.ts', `
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetcher(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(\`\${API_URL}\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(\`API Error: \${res.status}\`);
  return res.json();
}

export async function getProducts(filters?: Record<string, any>) { return fetcher('/api/products'); }
export async function getProductByCode(code: string) { return fetcher(\`/api/products/\${code}\`); }
export async function getFeaturedProducts() { return fetcher('/api/products?featured=true'); }
export async function getCategories() { return fetcher('/api/categories'); }
export async function getCategoryBySlug(slug: string) { return fetcher(\`/api/categories/\${slug}\`); }
export async function getCollections() { return fetcher('/api/collections'); }
export async function getFeaturedCollections() { return fetcher('/api/collections?featured=true'); }
export async function getCollectionBySlug(slug: string) { return fetcher(\`/api/collections/\${slug}\`); }
export async function getRates() { return fetcher('/api/rates'); }
export async function getShowroomInfo() { return fetcher('/api/showroom'); }
export async function submitEnquiry(data: any) {
  return fetcher('/api/enquiries', { method: 'POST', body: JSON.stringify(data) });
}

export async function adminLogin(email: string, password: string) { return fetcher('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); }
export async function adminGetProducts(filters?: any, token?: string) { return fetcher('/api/admin/products', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminCreateProduct(data: any, token: string) { return fetcher('/api/admin/products', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateProduct(id: string, data: any, token: string) { return fetcher(\`/api/admin/products/\${id}\`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminDeleteProduct(id: string, token: string) { return fetcher(\`/api/admin/products/\${id}\`, { method: 'DELETE', headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetCategories(token: string) { return fetcher('/api/admin/categories', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminCreateCategory(data: any, token: string) { return fetcher('/api/admin/categories', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateCategory(id: string, data: any, token: string) { return fetcher(\`/api/admin/categories/\${id}\`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetCollections(token: string) { return fetcher('/api/admin/collections', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminCreateCollection(data: any, token: string) { return fetcher('/api/admin/collections', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateCollection(id: string, data: any, token: string) { return fetcher(\`/api/admin/collections/\${id}\`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetRates(token: string) { return fetcher('/api/admin/rates', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateRate(data: any, token: string) { return fetcher('/api/admin/rates', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetRateHistory(token: string) { return fetcher('/api/admin/rates/history', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetEnquiries(filters?: any, token?: string) { return fetcher('/api/admin/enquiries', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateEnquiryStatus(id: string, status: string, token: string) { return fetcher(\`/api/admin/enquiries/\${id}/status\`, { method: 'PUT', body: JSON.stringify({ status }), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetSettings(token: string) { return fetcher('/api/admin/settings', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateShowroomSettings(data: any, token: string) { return fetcher('/api/admin/settings/showroom', { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUpdateBusinessSettings(data: any, token: string) { return fetcher('/api/admin/settings/business', { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminGetDashboard(token: string) { return fetcher('/api/admin/dashboard', { headers: { Authorization: \`Bearer \${token}\` } }); }
export async function adminUploadImage(file: File, token: string) { 
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(\`\${API_URL}/api/admin/uploads\`, { method: 'POST', body: formData, headers: { Authorization: \`Bearer \${token}\` } });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
`);

// 5. Auth Lib
writeFile('lib/auth.ts', `
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('admin_token');
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
}
`);

// Minimal Mock components for Layout
writeFile('components/layout/Navbar.tsx', `
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className="border-b border-border bg-ivory py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="font-serif text-2xl tracking-wide">HERITAGE JEWELLERS</Link>
      <div className="hidden md:flex space-x-6 text-sm font-sans tracking-wide uppercase">
        <Link href="/gold" className="hover:text-gold transition">Gold</Link>
        <Link href="/diamond" className="hover:text-gold transition">Diamond</Link>
        <Link href="/silver" className="hover:text-gold transition">Silver</Link>
        <Link href="/collections" className="hover:text-gold transition">Collections</Link>
      </div>
      <div>
        <Link href="/appointment" className="text-xs uppercase border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-ivory transition">Book Appointment</Link>
      </div>
    </nav>
  )
}
`);

writeFile('components/layout/Footer.tsx', `
export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-16 pb-8 px-6 text-center text-sm font-sans">
      <p>&copy; {new Date().getFullYear()} Heritage Jewellers. All rights reserved.</p>
    </footer>
  )
}
`);

writeFile('components/layout/AnnouncementBar.tsx', `
export default function AnnouncementBar() {
  return (
    <div className="bg-dark-bar text-ivory text-xs text-center py-2 uppercase tracking-widest font-sans">
      Complimentary secure shipping on all orders
    </div>
  )
}
`);

// Environment
writeFile('.env.local', `
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
`);

// App Home Page
writeFile('app/page.tsx', `
export default function Home() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-serif text-charcoal mb-4">Timeless Jewellery.</h1>
      <p className="text-xl font-serif italic text-gold mb-8">Trusted Tradition.</p>
      <p className="max-w-md mx-auto text-charcoal-lt mb-8">Discover our curated collection of heritage pieces crafted for generations.</p>
    </div>
  )
}
`);

console.log('Builder script completed.');
