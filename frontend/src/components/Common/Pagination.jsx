import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";
import { cn } from "../../utils/cn";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const updatePage = (p) => {
    onPageChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <PaginationButton
        onClick={() => updatePage(1)}
        disabled={currentPage === 1}
        icon={<FiChevronsLeft className="w-4 h-4" />}
        label="Trang đầu"
      />

      <PaginationButton
        onClick={() => updatePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        icon={<FiChevronLeft className="w-4 h-4" />}
        label="Trang trước"
      />

      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => {
          if (
            lastPage > 7 &&
            p !== 1 &&
            p !== lastPage &&
            Math.abs(p - currentPage) > 1
          ) {
            if (Math.abs(p - currentPage) === 2) {
              return <span key={p} className="text-slate-300 px-1">...</span>;
            }
            return null;
          }

          return (
            <button
              key={p}
              onClick={() => updatePage(p)}
              className={cn(
                "w-10 h-10 text-sm font-bold transition-all duration-200 border border-slate-200 cursor-pointer",
                p === currentPage
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-slate-500 hover:bg-slate-50 hover:text-primary"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      <PaginationButton
        onClick={() => updatePage(Math.min(lastPage, currentPage + 1))}
        disabled={currentPage === lastPage}
        icon={<FiChevronRight className="w-4 h-4" />}
        label="Trang sau"
      />

      <PaginationButton
        onClick={() => updatePage(lastPage)}
        disabled={currentPage === lastPage}
        icon={<FiChevronsRight className="w-4 h-4" />}
        label="Trang cuối"
      />
    </div>
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
          ? "text-slate-200 cursor-not-allowed bg-slate-50"
          : "bg-white text-slate-500 hover:bg-slate-50 hover:text-primary active:scale-95 cursor-pointer"
      )}
    >
      {icon}
    </button>
  );
}
