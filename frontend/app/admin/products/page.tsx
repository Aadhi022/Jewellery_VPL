'use client';
import { Button } from '../../../components/ui';

export default function ProductsAdmin() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Manage Products</h1>
        <Button variant="primary">Add New Product</Button>
      </div>

      <div className="bg-white border border-border shadow-sm mb-6 flex items-center p-4">
        <input 
          type="text" 
          placeholder="SEARCH PRODUCTS..." 
          className="bg-transparent border-none outline-none text-sm font-sans uppercase tracking-widest w-full"
        />
      </div>

      <div className="bg-white border border-border shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-cream text-xs uppercase tracking-widest text-charcoal-lt border-b border-border">
            <tr>
              <th className="px-6 py-4 font-normal">Image</th>
              <th className="px-6 py-4 font-normal">Code</th>
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Category</th>
              <th className="px-6 py-4 font-normal">Weight</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-cream border border-border"></div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-charcoal-lt">GR-{1020 + i}</td>
                <td className="px-6 py-4 font-serif text-lg">Antique Necklace</td>
                <td className="px-6 py-4 text-xs uppercase tracking-widest text-charcoal-lt">Bridal</td>
                <td className="px-6 py-4 text-xs">45.5g</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-green-50 text-green-700 border border-green-200">Available</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs uppercase tracking-widest text-gold hover:underline mr-4">Edit</button>
                  <button className="text-xs uppercase tracking-widest text-red-600 hover:underline">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
