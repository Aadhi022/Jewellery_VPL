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

// === PUBLIC PAGES ===
const pageTemplate = function(title) {
  return `export default function ${title.replace(/\s/g, '')}Page() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-serif text-charcoal mb-8">${title}</h1>
      <p className="text-charcoal-lt">This section is currently being curated.</p>
    </div>
  )
}`;
};

writeFile('app/gold/page.tsx', pageTemplate('Gold Jewellery'));
writeFile('app/gold/[category]/page.tsx', pageTemplate('Gold Category'));
writeFile('app/diamond/page.tsx', pageTemplate('Diamond Jewellery'));
writeFile('app/silver/page.tsx', pageTemplate('Silver Jewellery'));
writeFile('app/collections/page.tsx', pageTemplate('Collections'));
writeFile('app/collections/[slug]/page.tsx', pageTemplate('Collection Detail'));
writeFile('app/products/[productCode]/page.tsx', pageTemplate('Product Detail'));
writeFile('app/about/page.tsx', pageTemplate('Our Heritage'));
writeFile('app/contact/page.tsx', pageTemplate('Contact Us'));
writeFile('app/pawn-loan/page.tsx', pageTemplate('Gold Loan'));
writeFile('app/appointment/page.tsx', pageTemplate('Book an Appointment'));

// === ADMIN PAGES ===
const adminTemplate = function(title) {
  return `"use client";
export default function ${title.replace(/\s/g, '')}Admin() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif mb-6">${title}</h1>
    </div>
  )
}`;
};

writeFile('app/admin/login/page.tsx', adminTemplate('Admin Login'));
writeFile('app/admin/dashboard/page.tsx', adminTemplate('Dashboard'));
writeFile('app/admin/products/page.tsx', adminTemplate('Manage Products'));
writeFile('app/admin/products/new/page.tsx', adminTemplate('Add Product'));
writeFile('app/admin/products/[id]/page.tsx', adminTemplate('Edit Product'));
writeFile('app/admin/categories/page.tsx', adminTemplate('Manage Categories'));
writeFile('app/admin/collections/page.tsx', adminTemplate('Manage Collections'));
writeFile('app/admin/rates/page.tsx', adminTemplate('Manage Rates'));
writeFile('app/admin/enquiries/page.tsx', adminTemplate('Manage Enquiries'));
writeFile('app/admin/settings/page.tsx', adminTemplate('Settings'));

// Admin Layout
writeFile('app/admin/layout.tsx', `"use client";
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory text-charcoal">
      <aside className="w-64 border-r border-border p-6 hidden md:block">
        <h2 className="font-serif text-xl mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-sans text-sm">
          <Link href="/admin/dashboard" className="hover:text-gold">Dashboard</Link>
          <Link href="/admin/products" className="hover:text-gold">Products</Link>
          <Link href="/admin/categories" className="hover:text-gold">Categories</Link>
          <Link href="/admin/collections" className="hover:text-gold">Collections</Link>
          <Link href="/admin/rates" className="hover:text-gold">Rates</Link>
          <Link href="/admin/enquiries" className="hover:text-gold">Enquiries</Link>
          <Link href="/admin/settings" className="hover:text-gold">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white/50">
        {children}
      </main>
    </div>
  )
}`);

// SEO Files
writeFile('app/sitemap.ts', `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return [
    { url: \`\${baseUrl}/\`, lastModified: new Date() },
    { url: \`\${baseUrl}/gold\`, lastModified: new Date() },
    { url: \`\${baseUrl}/diamond\`, lastModified: new Date() },
    { url: \`\${baseUrl}/silver\`, lastModified: new Date() },
  ]
}`);

writeFile('app/robots.ts', `import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: \`\${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml\`,
  }
}`);

console.log('Pages builder script completed.');
