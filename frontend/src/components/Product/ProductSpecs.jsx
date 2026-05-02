import { motion } from "framer-motion";

export default function ProductSpecs({ product }) {
  const specs = [
    { label: "Mã sản phẩm", value: `#${product.id}` },
    { label: "Nhà cung cấp", value: product.provider },
    { label: "Đơn vị tính", value: product.unit },
    ...(product.book_details ? [
      { label: "Tác giả", value: product.book_details.author_name },
      { label: "Nhà xuất bản", value: product.book_details.publisher_name },
      { label: "Năm xuất bản", value: product.book_details.publish_year },
    ] : []),
    ...Object.entries(product.attributes || {}).map(([key, val]) => ({
      label: key,
      value: val
    }))
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {specs.map((spec, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm"
        >
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
            {spec.label}
          </span>
          <span className="text-sm font-bold text-secondary text-right break-words">
            {spec.value || "---"}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
