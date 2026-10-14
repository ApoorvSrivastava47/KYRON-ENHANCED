import { BrainCircuit, Activity, BarChart3, Info, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  currentPage: 'Prediction' | 'Analytics' | 'About Project';
  onSelectPage: (page: 'Prediction' | 'Analytics' | 'About Project') => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar = ({
  currentPage,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) => {
  const navItems = [
    { id: 'Prediction', label: 'Attrition Predictor', sub: 'Employee inference engine', icon: Activity },
    { id: 'Analytics', label: 'Analytics Dashboard', sub: 'Weights & benchmark metrics', icon: BarChart3 },
    { id: 'About Project', label: 'About Project', sub: 'Model specs & research', icon: Info },
  ] as const;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-80 bg-white/95 backdrop-blur-md border-r border-slate-200/80 flex flex-col transition-all duration-300 ease-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF5E00] to-[#FFA033] p-0.5 flex items-center justify-center shadow-md shadow-orange-500/25 transition-transform hover:scale-105 duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-[#FF5E00]" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>KYRON</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-orange-100 text-[#FF5E00] border border-orange-200/80">
                  v2.0
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">Workforce Retention Engine</div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-orange-50/70 border border-orange-200/60 text-[#C2410C] text-xs font-semibold shadow-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E00]" />
              </span>
              <span>IBM HR Calibrated Model</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#FF5E00]" />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Navigation
            </div>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectPage(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-[#EA580C] border border-orange-300/80 shadow-sm shadow-orange-500/10'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#FF5E00] text-white shadow-sm shadow-orange-500/30 scale-105'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-[#FF5E00]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight text-slate-800 group-hover:text-slate-900">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-6 rounded-full bg-[#FF5E00] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimal 3D Spec Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200/70 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Engine Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs space-y-1.5 text-slate-600 font-medium">
              <div className="flex justify-between py-0.5 border-b border-slate-200/50">
                <span className="text-slate-400">Model</span>
                <span className="font-semibold text-slate-700">Logistic Regression</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-200/50">
                <span className="text-slate-400">Predictors</span>
                <span className="font-semibold text-slate-700">47 Encoded</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Threshold</span>
                <span className="font-semibold text-[#FF5E00]">0.30 Cutoff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-slate-100 text-center text-xs text-slate-400">
          <div className="font-medium text-slate-600">Apoorv Srivastava · MNNIT</div>
          <div className="text-[10px] text-slate-400 mt-0.5">IBM HR Analytics Engine</div>
        </div>
      </aside>
    </>
  );
};
