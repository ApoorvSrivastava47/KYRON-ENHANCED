
interface Option {
  value: string;
  label: string;
  sub?: string;
}

interface ModernSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (val: string) => void;
  subtitle?: string;
}

export const ModernSelect: React.FC<ModernSelectProps> = ({
  label,
  value,
  options,
  onChange,
  subtitle,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-200 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-slate-700 tracking-tight block">{label}</span>
          {subtitle && <span className="text-[11px] text-slate-400 block">{subtitle}</span>}
        </div>
      </div>

      <div className="relative mt-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="modern-select w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200 hover:border-orange-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20 focus:border-[#FF5E00] transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} {opt.sub ? `(${opt.sub})` : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
