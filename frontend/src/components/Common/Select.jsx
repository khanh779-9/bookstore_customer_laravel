import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../../utils/cn';

const Select = ({ label, icon: Icon, value, onChange, options, placeholder = "Chọn...", className, containerClassName }) => {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-2">
          {Icon && <Icon className="text-primary" />}
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          value={value}
          onChange={onChange}
          className={cn(
            "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all cursor-pointer pr-10",
            "focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10",
            "group-hover:border-slate-300",
            className
          )}
        >
          <option value="" disabled hidden>{placeholder}</option>
          <option value="">Tất cả</option>
          {options.map((opt) => (
            <option key={opt.id || opt.value} value={opt.id || opt.value}>
              {opt.name || opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Select;
