import React from 'react';
import { cn } from '../../utils/cn';

const Loading = ({ message = "Đang tải dữ liệu...", className = "", fullScreen = false }) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center w-full animate-in fade-in duration-500",
      fullScreen ? "min-h-[70vh]" : "py-12",
      className
    )}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-primary/10 border-t-primary animate-spin"></div>
        
        {/* Inner Pulse */}
        <div className="absolute w-6 h-6 rounded-full bg-primary/20 animate-pulse"></div>
      </div>
      
      {message && (
        <p className="mt-4 text-slate-400 font-medium text-xs tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
