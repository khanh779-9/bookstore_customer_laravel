import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "../Product/ProductCard";
import { Loading } from "@/shared/ui";

export default function ProductSection({ title, subtitle, items, loading, error, viewAllLink, color = "primary" }) {
  const colorMap = {
    primary: "bg-primary",
    red: "bg-rose-500",
    amber: "bg-amber-500",
    secondary: "bg-secondary"
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-10 ${colorMap[color]} rounded-sm`} />
            <div>
              <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">{title}</h2>
              {subtitle && <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">{subtitle}</p>}
            </div>
          </div>

          <Link
            to={viewAllLink}
            className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:gap-3 ${
              color === 'red' ? 'text-rose-500' : color === 'amber' ? 'text-amber-600' : 'text-primary'
            }`}
          >
            Khám phá tất cả <FiArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loading message="Đang lấy danh sách sản phẩm..." />
          </div>
        ) : error ? (
          <div className="py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest bg-white border border-slate-100">
            Không thể tải dữ liệu vào lúc này
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest bg-white border border-slate-100">
            Hiện tại chưa có sản phẩm nào
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
