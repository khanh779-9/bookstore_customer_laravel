import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import AdminPagination from './AdminPagination';

export default function AdminDataTable({ 
  columns, 
  data, 
  loading, 
  onEdit, 
  onDelete, 
  emptyMessage = "Không có dữ liệu",
  idField = "id",
  pagination = null
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-6 py-4 text-center">Thao tác</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Đang tải dữ liệu...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-20">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr key={item[idField] || rowIdx} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-4 ${col.cellClassName || ''}`}>
                      {col.render ? col.render(item) : item[col.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(item)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-all cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(item[idField])}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-sm transition-all cursor-pointer"
                            title="Xóa"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <AdminPagination 
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
