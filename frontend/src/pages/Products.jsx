import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/Product/ProductCard';
import { FiFilter, FiX, FiChevronDown, FiSearch, FiBook, FiBriefcase, FiMapPin } from 'react-icons/fi';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const q = searchParams.get('q') || '';
  const categoryId = searchParams.get('danhmucSP_id') || '';
  const providerId = searchParams.get('provider_id') || '';
  const publisherId = searchParams.get('publisher_id') || '';
  const sortBy = searchParams.get('sort_by') || 'newest';
  const page = searchParams.get('page') || 1;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (categoryId) params.set('danhmucSP_id', categoryId);
    if (providerId) params.set('provider_id', providerId);
    if (publisherId) params.set('publisher_id', publisherId);
    if (sortBy) params.set('sort_by', sortBy);
    params.set('page', page);

    api.get(`/products?${params.toString()}`).then(res => {
      setProducts(res.data.products?.data || res.data.products || []);
      setPagination({
        currentPage: res.data.products?.current_page || 1,
        lastPage: res.data.products?.last_page || 1,
        total: res.data.products?.total || 0,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [q, categoryId, providerId, publisherId, sortBy, page]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/publishers'),
      api.get('/providers')
    ]).then(([catRes, pubRes, provRes]) => {
      setCategories(catRes.data || []);
      setPublishers(pubRes.data || []);
      setProviders(provRes.data || []);
    }).catch(() => {});
  }, []);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight italic">
            {q ? `Kết quả cho: "${q}"` : 'Tất cả sản phẩm'}
          </h1>
          <p className="text-gray-500 mt-2 font-bold flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Tìm thấy {pagination.total || products.length} sản phẩm phù hợp
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="lg:hidden flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <FiFilter /> Lọc
          </button>
          
          <div className="relative group">
            <select 
              value={sortBy} 
              onChange={e => updateFilter('sort_by', e.target.value)}
              className="appearance-none bg-white border-2 border-gray-100 rounded-2xl py-3 pl-6 pr-12 font-black text-gray-700 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="best_selling">Bán chạy nhất</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-72 space-y-10 shrink-0">
          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <FiFilter className="text-primary" /> Danh mục
            </h3>
            <div className="space-y-1">
              <button 
                onClick={() => updateFilter('danhmucSP_id', '')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${!categoryId ? 'bg-primary text-white font-black shadow-lg shadow-green-100 scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 font-bold'}`}
              >
                Tất cả sản phẩm
              </button>
              {categories.map(c => (
                <button 
                  key={c.danhmucSP_id}
                  onClick={() => updateFilter('danhmucSP_id', c.danhmucSP_id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${categoryId == c.danhmucSP_id ? 'bg-primary text-white font-black shadow-lg shadow-green-100 scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 font-bold'}`}
                >
                  {c.tenDanhMuc}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <FiBook className="text-primary" /> Nhà xuất bản
            </h3>
            <select 
              value={publisherId} 
              onChange={e => updateFilter('publisher_id', e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
            >
              <option value="">Tất cả NXB</option>
              {publishers.map(p => (
                <option key={p.nhaxuatban_id} value={p.nhaxuatban_id}>{p.tenNhaXuatBan}</option>
              ))}
            </select>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <FiBriefcase className="text-primary" /> Nhà cung cấp
            </h3>
            <select 
              value={providerId} 
              onChange={e => updateFilter('provider_id', e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
            >
              <option value="">Tất cả NCC</option>
              {providers.map(p => (
                <option key={p.nhacungcap_id} value={p.nhacungcap_id}>{p.tenNhaCungCap}</option>
              ))}
            </select>
          </section>

          <button 
            onClick={clearFilters}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-primary hover:text-primary transition-all text-sm"
          >
            Đặt lại bộ lọc
          </button>
        </aside>

        {/* Mobile Filter Overlay */}
        {showFilter && (
          <div className="fixed inset-0 z-[100] bg-black/60 lg:hidden backdrop-blur-sm" onClick={() => setShowFilter(false)}>
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-8 shadow-2xl animate-slide-right flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black italic">Bộ lọc</h3>
                <button onClick={() => setShowFilter(false)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"><FiX className="w-6 h-6" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Theo danh mục</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => { updateFilter('danhmucSP_id', ''); setShowFilter(false); }}
                      className={`px-4 py-3 rounded-xl text-left font-bold ${!categoryId ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600'}`}
                    >
                      Tất cả
                    </button>
                    {categories.map(c => (
                      <button 
                        key={c.danhmucSP_id}
                        onClick={() => { updateFilter('danhmucSP_id', c.danhmucSP_id); setShowFilter(false); }}
                        className={`px-4 py-3 rounded-xl text-left font-bold ${categoryId == c.danhmucSP_id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600'}`}
                      >
                        {c.tenDanhMuc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Nhà xuất bản</p>
                  <select 
                    value={publisherId} 
                    onChange={e => { updateFilter('publisher_id', e.target.value); setShowFilter(false); }}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold"
                  >
                    <option value="">Tất cả</option>
                    {publishers.map(p => <option key={p.nhaxuatban_id} value={p.nhaxuatban_id}>{p.tenNhaXuatBan}</option>)}
                  </select>
                </div>
              </div>

              <button 
                onClick={() => { clearFilters(); setShowFilter(false); }}
                className="mt-8 w-full py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Product Grid & Pagination */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-[2rem] h-80 animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-6">
                <FiSearch className="text-primary text-4xl" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Tiếc quá, không tìm thấy rồi!</h3>
              <p className="text-gray-500 mt-2 max-w-sm italic">Hãy thử dùng từ khóa khác hoặc xóa bớt bộ lọc bạn nhé.</p>
              <button 
                onClick={clearFilters}
                className="mt-8 bg-gray-900 text-white font-black py-4 px-10 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Làm mới tất cả
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => <ProductCard key={p.sanpham_id} product={p} />)}
              </div>

              {/* Pagination */}
              {pagination.lastPage > 1 && (
                <div className="flex items-center justify-center gap-3 mt-16">
                  {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => updateFilter('page', p > 1 ? p : '')}
                      className={`w-12 h-12 rounded-2xl font-black transition-all ${p === pagination.currentPage ? 'bg-primary text-white shadow-xl shadow-green-100 scale-110' : 'bg-white border-2 border-gray-50 text-gray-400 hover:border-primary hover:text-primary'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
