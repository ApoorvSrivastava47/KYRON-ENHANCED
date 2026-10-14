
interface Option<T> {
  value: T;
  label: string;
  badge?: string;
}

interface SegmentedControlProps<T> {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (val: T) => void;
  subtitle?: string;
}

export function SegmentedControl<T extends string | number>({
  label,
  value,
  options,
  onChange,
  subtitle,
}: SegmentedControlProps<T>) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-200 transition-all duration-200">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <span className="text-xs font-bold text-slate-700 tracking-tight block">{label}</span>
          {subtitle && <span className="text-[11px] text-slate-400 block">{subtitle}</span>}
        </div>
      </div>

      <div className="grid grid-flow-col auto-cols-fr gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-white text-[#FF5E00] shadow-sm shadow-orange-500/10 border border-orange-200/60 font-bold scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>{opt.label}</span>
              {opt.badge && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded ${
                    isSelected ? 'bg-orange-100 text-[#FF5E00]' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
