 import { FiX } from 'react-icons/fi';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children,
  maxWidth = "max-w-md"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden">
      <div className={`bg-white rounded-sm shadow-2xl w-full ${maxWidth} max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 scale-in-center`}>
        <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
