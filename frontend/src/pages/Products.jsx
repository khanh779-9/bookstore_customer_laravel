import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { lookupService } from "../services/lookupService";
import ProductCard from "../components/Product/ProductCard";
import { FiFilter, FiX, FiSearch, FiZap } from "react-icons/fi";
import { Loading, Select } from "@/shared/ui";
import Pagination from "../components/Common/Pagination";
import { cn } from "../utils/cn";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filters from URL
  const filters = {
    q: searchParams.get("q") || "",
    danhmucSP_id: searchParams.get("danhmucSP_id") || "",
    provider_id: searchParams.get("provider_id") || "",
    publisher_id: searchParams.get("publisher_id") || "",
    loaisach_code: searchParams.get("loaisach_code") || "",
    promoted_only: searchParams.get("promoted_only") === "1",
    sort_by: searchParams.get("sort_by") || "newest",
    page: parseInt(searchParams.get("page") || "1")
  };

  const updateFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      if (key !== "page") next.delete("page");
      return next;
    });
  }, [setSearchParams]);

  const clearFilters = () => setSearchParams({});

  // Queries
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getProducts({
      ...filters,
      promoted_only: filters.promoted_only ? 1 : undefined,
    }),
  });

  const { data: lookups = {} } = useQuery({
    queryKey: ["product-lookups"],
    queryFn: async () => {
      const [categories, publishers, providers, bookTypes] = await Promise.all([
        categoryService.getAllCategories(),
        lookupService.getPublishers(),
        lookupService.getProviders(),
        lookupService.getBookTypes(),
      ]);
      return { categories, publishers, providers, bookTypes };
    }
  });

  const products = productsData?.data || [];
  const meta = productsData?.meta || {};

  const FilterContent = ({ isMobile = false }) => (
    <div className={cn("space-y-6", isMobile ? "p-4" : "bg-white border border-slate-200 p-5")}>
      {!isMobile && (
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-sm">Bộ lọc</h3>
          <button onClick={clearFilters} className="text-xs text-slate-400 hover:text-primary cursor-pointer">Reset</button>
        </div>
      )}

      <button
        onClick={() => updateFilter("promoted_only", filters.promoted_only ? "" : "1")}
        className={cn(
          "w-full flex justify-between px-3 py-2 border text-sm transition-all",
          filters.promoted_only ? "bg-red-50 border-red-200 text-red-600" : "border-slate-200 text-slate-500"
        )}
      >
        <span className="flex items-center gap-2"><FiZap /> Giảm giá</span>
      </button>

      <FilterSection title="Danh mục">
        <Select
          value={filters.danhmucSP_id}
          onChange={(e) => updateFilter("danhmucSP_id", e.target.value)}
          options={lookups.categories || []}
          placeholder="Tất cả danh mục"
        />
      </FilterSection>

      {filters.danhmucSP_id == 1 && (
        <>
          <div className="border-t border-slate-100" />
          <FilterSection title="Nhà xuất bản">
            <Select
              value={filters.publisher_id}
              onChange={(e) => updateFilter("publisher_id", e.target.value)}
              options={lookups.publishers || []}
              placeholder="Tất cả NXB"
            />
          </FilterSection>

          <FilterSection title="Loại sách">
            <Select
              value={filters.loaisach_code}
              onChange={(e) => updateFilter("loaisach_code", e.target.value)}
              options={(lookups.bookTypes || []).map(l => ({ ...l, id: l.code }))}
              placeholder="Tất cả loại sách"
            />
          </FilterSection>
        </>
      )}

      <div className="border-t border-slate-100" />
      <FilterSection title="Nhà cung cấp">
        <Select
          value={filters.provider_id}
          onChange={(e) => updateFilter("provider_id", e.target.value)}
          options={lookups.providers || []}
          placeholder="Tất cả NCC"
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tight">
              {filters.q ? `Kết quả: "${filters.q}"` : "Tất cả sản phẩm"}
            </h1>
            <p className="text-xs pt-2 text-slate-400 font-bold uppercase tracking-widest">
              {meta.total || 0} sản phẩm tìm thấy
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex-1 px-4 py-2.5 bg-white border border-slate-200 text-sm font-bold flex items-center justify-center gap-2"
            >
              <FiFilter /> Lọc sản phẩm
            </button>

            <Select
              value={filters.sort_by}
              onChange={(e) => updateFilter("sort_by", e.target.value)}
              options={[
                { id: "newest", name: "Mới nhất" },
                { id: "price_asc", name: "Giá tăng dần" },
                { id: "price_desc", name: "Giá giảm dần" },
                { id: "best_selling", name: "Bán chạy nhất" },
              ]}
              className="min-w-[160px]"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-fit">
            <FilterContent />
          </aside>

          {/* Mobile Filter */}
          <AnimatePresence>
            {showMobileFilter && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowMobileFilter(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" />
                <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25 }} className="fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white z-[110] flex flex-col shadow-2xl">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-black text-secondary uppercase tracking-tight">Bộ lọc</h3>
                    <button onClick={() => setShowMobileFilter(false)} className="p-2 text-slate-400"><FiX size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <FilterContent isMobile />
                  </div>
                  <div className="p-4 border-t gap-2 flex">
                    <button onClick={() => { clearFilters(); setShowMobileFilter(false); }} className="flex-1 border border-slate-200 py-3 font-bold text-sm">Xóa hết</button>
                    <button onClick={() => setShowMobileFilter(false)} className="flex-1 bg-primary text-white py-3 font-bold text-sm shadow-lg shadow-primary/20">Áp dụng</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1">
            {isLoading ? (
              <Loading message="Đang tải danh sách sản phẩm..." />
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-white border border-slate-100 rounded-sm">
                <FiSearch className="text-6xl text-slate-100 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">Không tìm thấy sản phẩm</h3>
                <p className="text-slate-400">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <Pagination 
                  currentPage={meta.current_page} 
                  lastPage={meta.last_page} 
                  onPageChange={(p) => updateFilter("page", p)} 
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{title}</h4>
      {children}
    </div>
  );
}
