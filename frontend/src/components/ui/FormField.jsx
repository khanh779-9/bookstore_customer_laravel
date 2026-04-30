export function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          {label}
        </label>
      )}
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-3 bg-gray-50 border-1 border-transparent rounded-[5px]
        focus:border-primary focus:bg-white outline-none transition-all 
        font-bold placeholder:font-medium"
      />
    </div>
  );
}

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 5,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
      )}
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-3 bg-gray-50 border-1 border-transparent rounded-[5px]
        focus:border-primary focus:bg-white outline-none transition-all 
        font-bold placeholder:font-medium resize-none"
      />
    </div>
  );
}

export function FormCheckbox({ label, checked, onChange, required = false }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[5px] border-1 border-transparent hover:border-gray-100 transition-all group">
      <input
        type="checkbox"
        required={required}
        checked={checked}
        onChange={onChange}
        id="conse"
        className="w-5 h-5 rounded-lg border-2 border-gray-300 checkbox-color focus:ring-primary"
      />
      <label
        className="text-sm text-gray-500 font-bold cursor-pointer group-hover:text-gray-700"
        htmlFor="conse"
      >
        {label}
      </label>
    </div>
  );
}
