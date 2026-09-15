const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetcher(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getProducts(filters?: Record<string, any>) { return fetcher('/api/products'); }
export async function getProductByCode(code: string) { return fetcher(`/api/products/${code}`); }
export async function getFeaturedProducts() { return fetcher('/api/products?featured=true'); }
export async function getCategories() { return fetcher('/api/categories'); }
export async function getCategoryBySlug(slug: string) { return fetcher(`/api/categories/${slug}`); }
export async function getCollections() { return fetcher('/api/collections'); }
export async function getFeaturedCollections() { return fetcher('/api/collections?featured=true'); }
export async function getCollectionBySlug(slug: string) { return fetcher(`/api/collections/${slug}`); }
export async function getRates() { return fetcher('/api/rates'); }
export async function getShowroomInfo() { return fetcher('/api/showroom'); }
export async function submitEnquiry(data: any) {
  return fetcher('/api/enquiries', { method: 'POST', body: JSON.stringify(data) });
}

export async function adminLogin(email: string, password: string) { return fetcher('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); }
export async function adminGetProducts(filters?: any, token?: string) { return fetcher('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminCreateProduct(data: any, token: string) { return fetcher('/api/admin/products', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateProduct(id: string, data: any, token: string) { return fetcher(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminDeleteProduct(id: string, token: string) { return fetcher(`/api/admin/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetCategories(token: string) { return fetcher('/api/admin/categories', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminCreateCategory(data: any, token: string) { return fetcher('/api/admin/categories', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateCategory(id: string, data: any, token: string) { return fetcher(`/api/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetCollections(token: string) { return fetcher('/api/admin/collections', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminCreateCollection(data: any, token: string) { return fetcher('/api/admin/collections', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateCollection(id: string, data: any, token: string) { return fetcher(`/api/admin/collections/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetRates(token: string) { return fetcher('/api/admin/rates', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateRate(data: any, token: string) { return fetcher('/api/admin/rates', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetRateHistory(token: string) { return fetcher('/api/admin/rates/history', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetEnquiries(filters?: any, token?: string) { return fetcher('/api/admin/enquiries', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateEnquiryStatus(id: string, status: string, token: string) { return fetcher(`/api/admin/enquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetSettings(token: string) { return fetcher('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateShowroomSettings(data: any, token: string) { return fetcher('/api/admin/settings/showroom', { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUpdateBusinessSettings(data: any, token: string) { return fetcher('/api/admin/settings/business', { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }); }
export async function adminGetDashboard(token: string) { return fetcher('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } }); }
export async function adminUploadImage(file: File, token: string) { 
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_URL}/api/admin/uploads`, { method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
