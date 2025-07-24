import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

const Select = ({ label, options, ...props }: SelectProps) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <select
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
