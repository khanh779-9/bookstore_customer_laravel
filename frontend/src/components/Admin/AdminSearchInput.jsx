import { FiSearch } from 'react-icons/fi';

export default function AdminSearchInput({ value, onChange, placeholder = "Tìm kiếm..." }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden mb-6">
      <div className="p-4 bg-slate-50/30">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
