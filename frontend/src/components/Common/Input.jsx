import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  suffix,
  className, 
  containerClassName,
  labelClassName,
  type = "text",
  ...props 
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
      {label && (
        <label className={cn("text-xs font-bold text-slate-500 uppercase tracking-widest ml-1", labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full bg-white border border-slate-200 rounded-none py-3 px-4 text-sm font-medium transition-all focus:outline-none focus:border-primary placeholder:text-slate-300",
            Icon && "pl-11",
            error && "border-red-500 focus:ring-red-500/10 focus:border-red-500",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[10px] font-bold text-red-500 ml-1 mt-0.5 uppercase tracking-tighter">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;



