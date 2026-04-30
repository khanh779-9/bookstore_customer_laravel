import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const TextArea = forwardRef(({ 
  label, 
  error, 
  className, 
  containerClassName,
  labelClassName,
  ...props 
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
      {label && (
        <label className={cn("text-xs font-bold text-slate-500 uppercase tracking-widest ml-1", labelClassName)}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary placeholder:text-slate-300 min-h-[120px] resize-none",
          error && "border-red-500 focus:ring-red-500/10 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] font-bold text-red-500 ml-1 mt-0.5 uppercase tracking-tighter">
          {error}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
