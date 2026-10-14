import {
  GraduationCap,
  Award,
  Database,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Target,
  Sparkles,
} from 'lucide-react';

export const AboutView = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>About the KYRON Project</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Workforce Stability Prediction &amp; Organizational Analytics Engine
        </p>
      </div>

      {/* Hero Overview */}
      <div className="card-3d p-6 sm:p-8 bg-white border border-orange-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF5E00] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Research &amp; Engineering Artifact</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Employee Attrition Prediction System
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              KYRON bridges the gap between raw HR records and proactive organizational retention.
              By computing probabilistic departure risk, HR business partners can take preventive
              action rather than post-mortem exit reviews.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lead Researcher</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">Apoorv Srivastava</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Affiliation</div>
              <div className="text-sm font-extrabold text-[#FF5E00] mt-0.5">MNNIT Prayagraj</div>
            </div>
          </div>
        </div>

        {/* Specifications Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Database className="w-4 h-4 text-[#FF5E00]" />
              <span>Dataset Corpus</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-1.5">IBM HR Analytics</div>
            <div className="text-[11px] text-slate-500 mt-0.5">1,470 validated employee profiles</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Model Architecture</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-1.5">Logistic Regression</div>
            <div className="text-[11px] text-slate-500 mt-0.5">47 one-hot &amp; scaled features</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Target className="w-4 h-4 text-[#FF5E00]" />
              <span>Decision Threshold</span>
            </div>
            <div className="text-base font-extrabold text-[#C2410C] mt-1.5">0.30 Cutoff</div>
            <div className="text-[11px] text-slate-500 mt-0.5">High-recall retention trigger</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Primary Evaluation</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-1.5">Recall &amp; ROC-AUC</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Departure capture maximization</div>
          </div>
        </div>
      </div>

      {/* Problem Formulation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-3d p-6 bg-white">
          <div className="flex items-center gap-2 text-[#C2410C] font-bold text-sm mb-3">
            <AlertCircle className="w-4 h-4 text-[#FF5E00]" />
            <span>The Operational Problem</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Employee turnover is one of the single highest expenses faced by modern organizations.
            Recruiting, onboarding, and training replacements regularly costs between 50% and 200%
            of an employee&apos;s annual salary. Conventional HR processes analyze exits only after the
            two-week resignation notice is submitted.
          </p>
          <div className="mt-4 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
              <span>Disrupts ongoing sprints and mission-critical milestones</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
              <span>Drains specialized institutional and engineering memory</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
              <span>Spills heavy compensatory workloads onto remaining peers</span>
            </div>
          </div>
        </div>

        <div className="card-3d p-6 bg-white">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Machine Learning Formulation</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Formulated as a supervised binary classification challenge: given multidimensional
            employee attributes (demographics, compensation, tenure, satisfaction), the model maps
            the linear combination z = w&#7488;x + b through the sigmoid logistic function
            &sigma;(z) = 1 / (1 + e&macr;&sup2;).
          </p>
          <div className="mt-4 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Output Variable: Attrition (Yes / No probability)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Augments HR judgment with transparent statistical weights</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Immediate client-side execution with exact model parity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Footer Card */}
      <div className="card-3d p-6 bg-gradient-to-br from-white to-orange-50/20 border border-slate-200">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-3">
          <GraduationCap className="w-5 h-5 text-[#FF5E00]" />
          <span>Research &amp; Engineering Attribution</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Developed by <strong>Apoorv Srivastava</strong> at{' '}
          <strong>Motilal Nehru National Institute of Technology (MNNIT) Prayagraj</strong>. Built as part of the
          KYRON Workforce Stability Prediction &amp; Organizational Analytics Engine.
        </p>
      </div>
    </div>
  );
};
