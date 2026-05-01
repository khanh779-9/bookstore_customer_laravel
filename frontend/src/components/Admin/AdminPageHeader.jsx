import { FiPlus } from 'react-icons/fi';

export default function AdminPageHeader({ title, description, onAdd, addLabel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{title}</h1>
        <p className="text-slate-500 text-sm font-medium">{description}</p>
      </div>
      {onAdd && (
        <button 
          onClick={onAdd}
          className="bg-slate-900 text-white px-6 py-3 rounded-sm text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <FiPlus className="w-5 h-5" /> {addLabel || 'Thêm mới'}
        </button>
      )}
    </div>
  );
}
