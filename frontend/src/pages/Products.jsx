import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { lookupService } from "../services/lookupService";
import ProductCard from "../components/Product/ProductCard";
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiSearch,
  FiBook,
  FiBriefcase,
} from "react-icons/fi";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  const q = searchParams.get("q") || "";
  const categoryId = searchParams.get("danhmucSP_id") || "";
  const providerId = searchParams.get("provider_id") || "";
  const publisherId = searchParams.get("publisher_id") || "";
  const sortBy = searchParams.get("sort_by") || "newest";
  const page = parseInt(searchParams.get("page") || "1");

  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: [
      "products",
      { q, categoryId, providerId, publisherId, sortBy, page },
    ],
    queryFn: () =>
      productService.getProducts({
        q,
        danhmucSP_id: categoryId,
        provider_id: providerId,
        publisher_id: publisherId,
        sort_by: sortBy,
        page,
      }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAllCategories(),
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: () => lookupService.getPublishers(),
  });

  const { data: providers = [] } = useQuery({
    queryKey: ["providers"],
    queryFn: () => lookupService.getProviders(),
  });

  const products = productsData?.data || [];
  const pagination = {
    currentPage: productsData?.current_page || 1,
    lastPage: productsData?.last_page || 1,
    total: productsData?.total || 0,
  };

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    
    // Reset to page 1 only if we're not explicitly changing the page
    if (key !== "page") {
      params.delete("page");
    }
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const categoryButtonClass = (active) =>
    `w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
      active
        ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/10"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
    }`;

  const mobileCategoryButtonClass = (active) =>
    `px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
      active
        ? "bg-primary text-white"
        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {q ? `Kết quả cho: "${q}"` : "Tất cả sản phẩm"}
          </h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-primary rounded-full"></span>
            <span className="font-medium">
              Tìm thấy {pagination.total || products.length} sản phẩm phù hợp
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <FiFilter /> Lọc
          </button>

          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => updateFilter("sort_by", e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="best_selling">Bán chạy nhất</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4 flex items-center gap-2">
              <FiFilter className="text-primary" /> Danh mục
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => updateFilter("danhmucSP_id", "")}
                className={categoryButtonClass(!categoryId)}
              >
                Tất cả sản phẩm
              </button>

              {Array.isArray(categories) &&
                categories.map((c) => (
                  <button
                    key={c.danhmucSP_id}
                    onClick={() => updateFilter("danhmucSP_id", c.danhmucSP_id)}
                    className={categoryButtonClass(
                      categoryId == c.danhmucSP_id,
                    )}
                  >
                    {c.tenDanhMuc}
                  </button>
                ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4 flex items-center gap-2">
              <FiBook className="text-primary" /> Nhà xuất bản
            </h3>

            <select
              value={publisherId}
              onChange={(e) => updateFilter("publisher_id", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            >
              <option value="">Tất cả NXB</option>
              {Array.isArray(publishers) &&
                publishers.map((p) => (
                  <option key={p.nhaxuatban_id} value={p.nhaxuatban_id}>
                    {p.ten}
                  </option>
                ))}
            </select>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4 flex items-center gap-2">
              <FiBriefcase className="text-primary" /> Nhà cung cấp
            </h3>

            <select
              value={providerId}
              onChange={(e) => updateFilter("provider_id", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            >
              <option value="">Tất cả NCC</option>
              {Array.isArray(providers) &&
                providers.map((p) => (
                  <option key={p.nhacungcap_id} value={p.nhacungcap_id}>
                    {p.ten}
                  </option>
                ))}
            </select>
          </section>

          <button
            onClick={clearFilters}
            className="w-full py-3.5 border border-dashed border-gray-300 rounded-2xl text-gray-500 font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm"
          >
            Đặt lại bộ lọc
          </button>
        </aside>

        {showFilter && (
          <div
            className="fixed inset-0 z-[100] bg-black/50 lg:hidden backdrop-blur-sm"
            onClick={() => setShowFilter(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-white p-6 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Theo danh mục
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => {
                        updateFilter("danhmucSP_id", "");
                        setShowFilter(false);
                      }}
                      className={mobileCategoryButtonClass(!categoryId)}
                    >
                      Tất cả
                    </button>
                    {Array.isArray(categories) &&
                      categories.map((c) => (
                        <button
                          key={c.danhmucSP_id}
                          onClick={() => {
                            updateFilter("danhmucSP_id", c.danhmucSP_id);
                            setShowFilter(false);
                          }}
                          className={mobileCategoryButtonClass(
                            categoryId == c.danhmucSP_id,
                          )}
                        >
                          {c.tenDanhMuc}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Nhà xuất bản
                  </p>
                  <select
                    value={publisherId}
                    onChange={(e) => {
                      updateFilter("publisher_id", e.target.value);
                      setShowFilter(false);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  >
                    <option value="">Tất cả</option>
                    {Array.isArray(publishers) &&
                      publishers.map((p) => (
                        <option key={p.nhaxuatban_id} value={p.nhaxuatban_id}>
                          {p.ten}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Nhà cung cấp
                  </p>
                  <select
                    value={providerId}
                    onChange={(e) => {
                      updateFilter("provider_id", e.target.value);
                      setShowFilter(false);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  >
                    <option value="">Tất cả</option>
                    {Array.isArray(providers) &&
                      providers.map((p) => (
                        <option key={p.nhacungcap_id} value={p.nhacungcap_id}>
                          {p.ten}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setShowFilter(false);
                }}
                className="mt-6 w-full py-4 bg-gray-900 text-white font-medium rounded-2xl shadow-lg active:scale-[0.98] transition"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0">
          {loadingProducts ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-3xl h-80 animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-5">
                <FiSearch className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                Thử đổi từ khóa hoặc giảm bớt bộ lọc để xem thêm kết quả.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 bg-gray-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition"
              >
                Làm mới tất cả
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.sanpham_id} product={p} />
                ))}
              </div>

              {pagination.lastPage > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
                  {Array.from(
                    { length: pagination.lastPage },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateFilter("page", p > 1 ? p : "")}
                      className={`w-11 h-11 rounded-xl text-sm font-medium transition-all ${
                        p === pagination.currentPage
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                      }`}
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
