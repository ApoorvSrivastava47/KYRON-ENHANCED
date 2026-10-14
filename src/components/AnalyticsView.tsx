import { useState } from 'react';
import {
  BarChart3,
  Sliders,
  TrendingUp,
  TrendingDown,
  Layers,
  Cpu,
  Database,
  Info,
} from 'lucide-react';
import { MODEL_COEFFICIENTS, MODEL_FEATURE_NAMES } from '../model/modelData';
import { ModernSlider } from './ui/ModernSlider';

export const AnalyticsView = () => {
  const [threshold, setThreshold] = useState<number>(0.30);

  // Parse model weights into sorted positive and negative drivers
  const featuresWithWeights = MODEL_FEATURE_NAMES.map((name, idx) => ({
    name,
    weight: MODEL_COEFFICIENTS[idx],
  }))
    .filter((f) => !['EmployeeCount', 'EmployeeNumber', 'StandardHours'].includes(f.name))
    .sort((a, b) => b.weight - a.weight);

  const topRiskEscalators = featuresWithWeights.filter((f) => f.weight > 0).slice(0, 8);
  const topRetentionAnchors = [...featuresWithWeights]
    .filter((f) => f.weight < 0)
    .sort((a, b) => a.weight - b.weight)
    .slice(0, 8);

  const maxAbsWeight = Math.max(...featuresWithWeights.map((f) => Math.abs(f.weight)));

  const departmentData = [
    { name: 'Sales', count: 446, attritionRate: '20.6%', risk: 'High Risk' },
    { name: 'Research & Development', count: 961, attritionRate: '13.8%', risk: 'Moderate Risk' },
    { name: 'Human Resources', count: 63, attritionRate: '19.0%', risk: 'High Risk' },
  ];

  const roleRiskBenchmarks = [
    { role: 'Sales Representative', avgAttrition: '39.8%', riskLevel: 'Critical Risk' },
    { role: 'Laboratory Technician', avgAttrition: '23.9%', riskLevel: 'High Risk' },
    { role: 'Human Resources', avgAttrition: '23.1%', riskLevel: 'High Risk' },
    { role: 'Sales Executive', avgAttrition: '17.5%', riskLevel: 'Moderate' },
    { role: 'Research Scientist', avgAttrition: '16.1%', riskLevel: 'Moderate' },
    { role: 'Manufacturing Director', avgAttrition: '6.9%', riskLevel: 'Low Risk' },
    { role: 'Healthcare Representative', avgAttrition: '6.9%', riskLevel: 'Low Risk' },
    { role: 'Manager', avgAttrition: '4.9%', riskLevel: 'Very Low' },
    { role: 'Research Director', avgAttrition: '2.5%', riskLevel: 'Very Low' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Analytics &amp; Model Explanations</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed breakdown of logistic weights, threshold sensitivity calibration, and IBM HR benchmarks.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-3d p-5 bg-white">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase mb-1">
            <span>Predictors</span>
            <Layers className="w-4 h-4 text-[#FF5E00]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">47</div>
          <div className="text-[11px] text-slate-500 mt-1">Engineered Dimensions</div>
        </div>

        <div className="card-3d p-5 bg-white">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase mb-1">
            <span>Algorithm</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">Logistic Reg.</div>
          <div className="text-[11px] text-slate-500 mt-1">Calibrated Sigmoid</div>
        </div>

        <div className="card-3d p-5 bg-white">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase mb-1">
            <span>IBM HR Corpus</span>
            <Database className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1,470</div>
          <div className="text-[11px] text-slate-500 mt-1">Historical Samples</div>
        </div>

        <div className="card-3d p-5 bg-white">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase mb-1">
            <span>Natural Baseline</span>
            <BarChart3 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-[#FF5E00]">16.1%</div>
          <div className="text-[11px] text-slate-500 mt-1">Historical Exit Rate</div>
        </div>
      </div>

      {/* DECISION THRESHOLD TUNER */}
      <div className="card-3d p-6 sm:p-8 bg-white border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Decision Threshold Sensitivity Tuner
              </h3>
              <p className="text-xs text-slate-500">
                Adjust cutoff probability to simulate Recall vs. Precision balance
              </p>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-[#C2410C] font-mono text-sm font-extrabold self-start shadow-xs">
            Cutoff: {(threshold * 100).toFixed(0)}%
          </div>
        </div>

        <ModernSlider
          label="Risk Probability Cutoff"
          subtitle="Employees exceeding this score are flagged for retention intervention"
          value={threshold}
          min={0.10}
          max={0.60}
          step={0.05}
          unit="%"
          onChange={(v) => setThreshold(Number(v.toFixed(2)))}
          minLabel="10% (Maximum Recall)"
          maxLabel="60% (High Precision)"
        />

        <div className="mt-5 p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-xs text-slate-700 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#FF5E00] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 font-bold">Why 0.30 instead of 0.50? </strong>
            In corporate HR analytics, false negatives (failing to identify an employee who resigns)
            carry severe disruption costs ($50k - $150k replacement cost). Calibrating the decision
            threshold at <strong>0.30</strong> optimizes Recall so HR partners have ample lead time to
            initiate preventive retention conversations.
          </div>
        </div>
      </div>

      {/* FEATURE IMPORTANCE / COEFFICIENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Escalators */}
        <div className="card-3d p-6 bg-white">
          <div className="flex items-center gap-2 mb-4 text-[#FF5E00] font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-[#FF5E00]" />
            <span>Top Attrition Risk Escalators (+ Log-Odds)</span>
          </div>
          <div className="space-y-3.5">
            {topRiskEscalators.map((item) => {
              const widthPct = Math.min(100, Math.round((Math.abs(item.weight) / maxAbsWeight) * 100));
              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-800 font-semibold">
                      {item.name.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[#C2410C] font-mono font-extrabold">
                      +{item.weight.toFixed(4)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-[#FF5E00] rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retention Anchors */}
        <div className="card-3d p-6 bg-white">
          <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold text-sm">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <span>Top Retention Anchors (- Log-Odds / Protective)</span>
          </div>
          <div className="space-y-3.5">
            {topRetentionAnchors.map((item) => {
              const widthPct = Math.min(100, Math.round((Math.abs(item.weight) / maxAbsWeight) * 100));
              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-800 font-semibold">
                      {item.name.replace(/_/g, ' ')}
                    </span>
                    <span className="text-emerald-700 font-mono font-extrabold">
                      {item.weight.toFixed(4)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DEPARTMENT & ROLE BENCHMARKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-3d p-6 bg-white">
          <h4 className="text-sm font-bold text-slate-900 mb-4">Departmental Baseline Attrition</h4>
          <div className="divide-y divide-slate-100">
            {departmentData.map((d) => (
              <div key={d.name} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">{d.name}</div>
                  <div className="text-slate-400 text-[11px]">{d.count} total records evaluated</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-extrabold text-slate-900">{d.attritionRate}</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.risk.includes('High')
                        ? 'bg-orange-100 text-[#C2410C]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {d.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-3d p-6 bg-white">
          <h4 className="text-sm font-bold text-slate-900 mb-4">Role Vulnerability Index</h4>
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 divide-y divide-slate-100">
            {roleRiskBenchmarks.map((r) => (
              <div key={r.role} className="pt-2.5 pb-1 flex items-center justify-between text-xs">
                <span className="text-slate-800 font-medium">{r.role}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900">{r.avgAttrition}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                      r.riskLevel.includes('Critical')
                        ? 'bg-orange-100 text-[#C2410C] border border-orange-200'
                        : r.riskLevel.includes('High')
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : r.riskLevel.includes('Moderate')
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {r.riskLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
