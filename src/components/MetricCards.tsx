import { Cpu, Layers, Database, Radio } from 'lucide-react';

export const MetricCards = () => {
  const metrics = [
    {
      label: 'Model Architecture',
      value: 'Logistic Regression',
      sub: 'Calibrated Sigmoid Output',
      icon: Cpu,
      color: 'bg-orange-50 text-[#FF5E00] border-orange-200/80',
    },
    {
      label: 'Input Features',
      value: '47',
      sub: 'Engineered Indicators',
      icon: Layers,
      color: 'bg-amber-50 text-amber-600 border-amber-200/80',
    },
    {
      label: 'Validation Benchmark',
      value: 'IBM HR',
      sub: '1,470 Historical Records',
      icon: Database,
      color: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      label: 'System Status',
      value: 'Live Engine',
      sub: '0ms Client-side Latency',
      icon: Radio,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      isLive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="card-3d p-5 bg-white relative overflow-hidden group cursor-default"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {m.label}
              </span>
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {m.value}
              </span>
              {m.isLive && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Active
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-1 font-medium">{m.sub}</p>
          </div>
        );
      })}
    </div>
  );
};
