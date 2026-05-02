import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { lookupService } from "../services/lookupService";
import { useAuth } from "../contexts/AuthContext";
import ProductCard from "../components/Product/ProductCard";
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiSearch,
  FiRefreshCcw,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Loading } from "@/shared/ui";
import { Select } from "@/shared/ui";
import { cn } from "../utils/cn";

export default function Products() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const q = searchParams.get("q") || "";
  const categoryId = searchParams.get("danhmucSP_id") || "";
  const providerId = searchParams.get("provider_id") || "";
  const publisherId = searchParams.get("publisher_id") || "";
  const loaisachCode = searchParams.get("loaisach_code") || "";
  const promotedOnly = searchParams.get("promoted_only") === "1";
  const sortBy = searchParams.get("sort_by") || "newest";
  const page = parseInt(searchParams.get("page") || "1");

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.delete("page");
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // ===== API =====
  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "products",
      {
        q,
        categoryId,
        providerId,
        publisherId,
        loaisachCode,
        promotedOnly,
        sortBy,
        page,
      },
      isAuthenticated,
    ],
    queryFn: () =>
      productService.getProducts({
        q: q || undefined,
        danhmucSP_id: categoryId || undefined,
        provider_id: providerId || undefined,
        publisher_id: publisherId || undefined,
        loaisach_code: loaisachCode || undefined,
        promoted_only: promotedOnly ? 1 : undefined,
        sort_by: sortBy,
        page,
      }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: lookupService.getPublishers,
  });

  const { data: providers = [] } = useQuery({
    queryKey: ["providers"],
    queryFn: lookupService.getProviders,
  });

  const { data: loaisachs = [] } = useQuery({
    queryKey: ["bookTypes"],
    queryFn: lookupService.getBookTypes,
  });

  const products = productsData?.data || [];
  const meta = productsData?.meta || {};
  const pagination = {
    currentPage: meta.current_page || 1,
    lastPage: meta.last_page || 1,
    total: meta.total || 0,
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto py-8 ">
        {/* HEADER */}
        <div className="mb-4 flex justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary">
              {q ? `Kết quả: "${q}"` : "Tất cả sản phẩm"}
            </h1>
            <p className="text-xs pt-2 text-slate-400 font-semibold uppercase">
              {pagination.total} sản phẩm
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden px-4 py-2 bg-white border text-sm"
            >
              <FiFilter /> Lọc
            </button>

            <Select
              value={sortBy}
              onChange={(e) => updateFilter("sort_by", e.target.value)}
              placeholder="Sắp xếp"
              options={[
                { id: "newest", name: "Mới nhất" },
                { id: "price_asc", name: "Giá tăng" },
                { id: "price_desc", name: "Giá giảm" },
                { id: "best_selling", name: "Bán chạy" },
              ]}
              className="py-2 min-w-[140px] shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* ===== FILTER PANEL ===== */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-fit shadow-sm ">
            <div className="bg-white border border-slate-200 p-5 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm">Bộ lọc</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-slate-400 hover:text-primary"
                >
                  Reset
                </button>
              </div>

              {/* Promo */}
              <button
                onClick={() =>
                  updateFilter("promoted_only", promotedOnly ? "" : "1")
                }
                className={cn(
                  "w-full flex justify-between px-3 py-2 border rounded-none text-sm",
                  promotedOnly
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-slate-200 text-slate-500",
                )}
              >
                <span className="flex items-center gap-2">
                  <FiZap /> Giảm giá
                </span>
              </button>

              {/* Category */}
              <Section title="Danh mục">
                <Select
                  value={categoryId}
                  onChange={(e) => updateFilter("danhmucSP_id", e.target.value)}
                  options={categories}
                  placeholder="Chọn danh mục..."
                  className="py-2"
                />
              </Section>

              {categoryId == 1 && (
                <>
                  <Divider />
                  {/* Publisher */}
                  <Section title="Nhà xuất bản">
                    <Select
                      value={publisherId}
                      onChange={(e) =>
                        updateFilter("publisher_id", e.target.value)
                      }
                      options={publishers}
                      placeholder="Chọn NXB..."
                      className="py-2"
                    />
                  </Section>

                  {/* Loại sách */}
                  <Section title="Loại sách">
                    <Select
                      value={loaisachCode}
                      onChange={(e) =>
                        updateFilter("loaisach_code", e.target.value)
                      }
                      options={loaisachs.map((l) => ({ ...l, id: l.code }))}
                      placeholder="Chọn loại sách..."
                      className="py-2"
                    />
                  </Section>
                </>
              )}

              <Divider/>

              {/* Provider */}
              <Section title="Nhà cung cấp">
                <Select
                  value={providerId}
                  onChange={(e) => updateFilter("provider_id", e.target.value)}
                  options={providers}
                  placeholder="Chọn NCC..."
                  className="py-2"
                />
              </Section>
            </div>
          </aside>

          <AnimatePresence>
            {showMobileFilter && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileFilter(false)}
                  className="fixed inset-0 bg-black/40 z-[100]"
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[110] flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-bold text-secondary">Bộ lọc</h3>
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="p-2 bg-slate-100 rounded-none"
                    >
                      <FiX />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* PROMO */}
                    <button
                      onClick={() =>
                        updateFilter("promoted_only", promotedOnly ? "" : "1")
                      }
                      className={cn(
                        "w-full flex justify-between px-3 py-2 border rounded-none text-sm",
                        promotedOnly
                          ? "bg-red-50 border-red-200 text-red-600"
                          : "border-slate-200 text-slate-500",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <FiZap /> Giảm giá
                      </span>
                    </button>

                    {/* CATEGORY */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 mb-2">
                        Danh mục
                      </h4>
                      <Select
                        value={categoryId}
                        onChange={(e) =>
                          updateFilter("danhmucSP_id", e.target.value)
                        }
                        options={categories}
                        placeholder="Chọn danh mục..."
                      />
                    </div>

                    {/* PUBLISHER & BOOK TYPE (Conditional) */}
                    {categoryId == 1 && (
                      <>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 mb-2">
                            Nhà xuất bản
                          </h4>
                          <Select
                            value={publisherId}
                            onChange={(e) =>
                              updateFilter("publisher_id", e.target.value)
                            }
                            options={publishers}
                            placeholder="Chọn NXB..."
                          />
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-400 mb-2">
                            Loại sách
                          </h4>
                          <Select
                            value={loaisachCode}
                            onChange={(e) =>
                              updateFilter("loaisach_code", e.target.value)
                            }
                            options={loaisachs.map((l) => ({ ...l, id: l.code }))}
                            placeholder="Chọn loại sách..."
                          />
                        </div>
                      </>
                    )}

                    {/* PROVIDER */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 mb-2">
                        Nhà cung cấp
                      </h4>
                      <Select
                        value={providerId}
                        onChange={(e) =>
                          updateFilter("provider_id", e.target.value)
                        }
                        options={providers}
                        placeholder="Chọn NCC..."
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t space-y-2">
                    <button
                      onClick={() => {
                        clearFilters();
                        setShowMobileFilter(false);
                      }}
                      className="w-full border border-slate-200 py-2 rounded-none text-sm"
                    >
                      Xóa bộ lọc
                    </button>

                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="w-full bg-primary text-white py-2 rounded-none text-sm font-semibold"
                    >
                      Áp dụng
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ===== PRODUCTS ===== */}
          <main className="flex-1">
            {isLoading ? (
              <Loading message="Đang tìm sản phẩm phù hợp..." />
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <FiSearch className="text-4xl text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500">Không có sản phẩm</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* PAGINATION */}
                {pagination.lastPage > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">
                    {/* First Page */}
                    <PaginationButton
                      onClick={() => updateFilter("page", 1)}
                      disabled={pagination.currentPage === 1}
                      icon={<FiChevronsLeft className="w-4 h-4" />}
                      label="Trang đầu"
                    />

                    {/* Prev Page */}
                    <PaginationButton
                      onClick={() =>
                        updateFilter(
                          "page",
                          Math.max(1, pagination.currentPage - 1),
                        )
                      }
                      disabled={pagination.currentPage === 1}
                      icon={<FiChevronLeft className="w-4 h-4" />}
                      label="Trang trước"
                    />

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5 px-2">
                      {Array.from(
                        { length: pagination.lastPage },
                        (_, i) => i + 1,
                      ).map((p) => {
                        // Logic to show only a few pages if many
                        if (
                          pagination.lastPage > 7 &&
                          p !== 1 &&
                          p !== pagination.lastPage &&
                          Math.abs(p - pagination.currentPage) > 1
                        ) {
                          if (Math.abs(p - pagination.currentPage) === 2) {
                            return (
                              <span key={p} className="text-slate-300 px-1">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={p}
                            onClick={() => {
                              updateFilter("page", p);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={cn(
                              "w-10 h-10 text-sm font-bold transition-all duration-200 border border-slate-200 cursor-pointer",
                              p === pagination.currentPage
                                ? "bg-primary text-white"
                                : "bg-white text-slate-500 hover:bg-slate-50 hover:text-primary",
                            )}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Page */}
                    <PaginationButton
                      onClick={() =>
                        updateFilter(
                          "page",
                          Math.min(
                            pagination.lastPage,
                            pagination.currentPage + 1,
                          ),
                        )
                      }
                      disabled={pagination.currentPage === pagination.lastPage}
                      icon={<FiChevronRight className="w-4 h-4" />}
                      label="Trang sau"
                    />

                    {/* Last Page */}
                    <PaginationButton
                      onClick={() => updateFilter("page", pagination.lastPage)}
                      disabled={pagination.currentPage === pagination.lastPage}
                      icon={<FiChevronsRight className="w-4 h-4" />}
                      label="Trang cuối"
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Divider() {
  return <div className="border-t border-slate-100" />;
}

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold text-slate-400 uppercase">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-none text-sm font-semibold",
        active ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}

function PaginationButton({ onClick, disabled, icon, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        "w-10 h-10 flex items-center justify-center transition-all duration-200 border border-slate-200",
        disabled
          ? "text-slate-200 cursor-not-allowed"
          : "bg-white text-slate-500 hover:bg-slate-50 hover:text-primary shadow-none active:scale-95 cursor-pointer",
      )}
    >
      {icon}
    </button>
  );
}
