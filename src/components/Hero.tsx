import { Sparkles, ShieldAlert, ArrowUpRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="card-3d relative overflow-hidden mb-8 p-8 sm:p-10 border border-orange-100 bg-gradient-to-br from-white via-white to-orange-50/40">
      {/* Subtle ambient orange blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400/10 via-amber-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF5E00] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5E00]" />
            <span>Calibrated Workforce Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Employee Attrition{' '}
            <span className="bg-gradient-to-r from-[#FF5E00] to-[#FF8C38] bg-clip-text text-transparent">
              Intelligence
            </span>{' '}
            Platform
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            AI-powered organizational analytics engine. Forecast flight risk in real time, identify retention drivers, and proactively retain top talent.
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-time Sigmoid Inference</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Recall-Prioritized Risk Detection</span>
            </div>
          </div>
        </div>

        {/* 3D Glass Indicator Cards */}
        <div className="flex sm:flex-row lg:flex-col gap-3.5 shrink-0">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-orange-200/70 shadow-sm shadow-orange-500/5 flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5E00]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Risk Sensitivity</div>
              <div className="text-base font-extrabold text-slate-900 font-mono">&ge; 30% Probability</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Benchmark Source</div>
              <div className="text-base font-extrabold text-slate-900 font-mono">IBM HR Dataset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
