import { Minus, Plus } from 'lucide-react';

interface ModernSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  subtitle?: string;
  onChange: (val: number) => void;
  minLabel?: string;
  maxLabel?: string;
}

export const ModernSlider: React.FC<ModernSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  prefix = '',
  subtitle,
  onChange,
  minLabel,
  maxLabel,
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleDecrement = () => {
    const next = Math.max(min, value - step);
    onChange(next);
  };

  const handleIncrement = () => {
    const next = Math.min(max, value + step);
    onChange(next);
  };

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-200 hover:shadow-sm transition-all duration-200">
      {/* Label and Live Value */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-slate-700 tracking-tight block">{label}</span>
          {subtitle && <span className="text-[11px] text-slate-400 block">{subtitle}</span>}
        </div>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-orange-50 border border-orange-200 text-[#FF5E00] font-mono text-xs font-bold shadow-xs">
          {prefix}
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit}
        </div>
      </div>

      {/* Slider with - / + controls */}
      <div className="flex items-center gap-2.5 mt-2.5">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-500 hover:text-[#FF5E00] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors shrink-0"
          aria-label="Decrease"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, #FF5E00 0%, #FF5E00 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`,
            }}
            className="w-full h-2 rounded-full cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-500 hover:text-[#FF5E00] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors shrink-0"
          aria-label="Increase"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Min / Max boundary labels */}
      <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1.5 px-8">
        <span>{minLabel || `${prefix}${min}${unit}`}</span>
        <span>{maxLabel || `${prefix}${max}${unit}`}</span>
      </div>
    </div>
  );
};
