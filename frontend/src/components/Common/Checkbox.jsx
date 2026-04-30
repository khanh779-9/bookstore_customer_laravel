import React from 'react';
import { cn } from '../../utils/cn';

const Checkbox = ({ label, checked, onChange, required = false, className, containerClassName }) => {
  return (
    <label className={cn(
      "flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all group cursor-pointer",
      checked && "bg-primary/5 border-primary/10",
      containerClassName
    )}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          required={required}
          checked={checked}
          onChange={onChange}
          className={cn(
            "w-5 h-5 rounded-lg border-2 border-slate-300 appearance-none checked:bg-primary checked:border-primary transition-all cursor-pointer",
            className
          )}
        />
        {checked && (
          <svg 
            className="absolute w-3 h-3 text-white pointer-events-none" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-slate-500 font-bold group-hover:text-secondary transition-colors">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
