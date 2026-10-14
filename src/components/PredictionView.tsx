import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  DollarSign,
  TrendingUp,
  Smile,
  Target,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Zap,
  Lightbulb,
} from 'lucide-react';
import {
  EmployeeFormData,
  JobRole,
  OvertimeStatus,
  BusinessTravel,
  Department,
  EducationField,
  Gender,
  MaritalStatus,
  PredictionResult,
} from '../types';
import { DEFAULT_FORM_DATA, predictAttrition } from '../model/predictor';
import { ModernSlider } from './ui/ModernSlider';
import { SegmentedControl } from './ui/SegmentedControl';
import { ModernSelect } from './ui/ModernSelect';

export const PredictionView = () => {
  const [formData, setFormData] = useState<EmployeeFormData>(DEFAULT_FORM_DATA);
  const [result, setResult] = useState<PredictionResult | null>(() =>
    predictAttrition(DEFAULT_FORM_DATA)
  );
  const [isCalculating, setIsCalculating] = useState(false);

  // Expandable sections state
  const [openSections, setOpenSections] = useState({
    personal: true,
    job: true,
    compensation: true,
    experience: true,
    satisfaction: true,
    performance: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = <K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = predictAttrition(formData);
      setResult(res);
      setIsCalculating(false);
    }, 120);
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_DATA);
    setResult(predictAttrition(DEFAULT_FORM_DATA));
  };

  const applyPreset = (presetName: string) => {
    let preset: EmployeeFormData;
    if (presetName === 'highRisk') {
      preset = {
        ...DEFAULT_FORM_DATA,
        overtime: 'Yes',
        yearsSinceLastPromotion: 7,
        numCompaniesWorked: 6,
        distanceFromHome: 25,
        environmentSatisfaction: 1,
        jobSatisfaction: 1,
        workLifeBalance: 1,
        relationshipSatisfaction: 1,
        stockOptionLevel: 0,
        yearsWithCurrManager: 1,
        maritalStatus: 'Single',
        monthlyIncome: 3200,
      };
    } else if (presetName === 'stable') {
      preset = {
        ...DEFAULT_FORM_DATA,
        overtime: 'No',
        yearsAtCompany: 12,
        yearsInCurrentRole: 7,
        yearsSinceLastPromotion: 1,
        yearsWithCurrManager: 7,
        environmentSatisfaction: 4,
        jobSatisfaction: 4,
        workLifeBalance: 4,
        relationshipSatisfaction: 4,
        stockOptionLevel: 2,
        monthlyIncome: 9500,
        jobLevel: 3,
        numCompaniesWorked: 1,
      };
    } else if (presetName === 'researcher') {
      preset = {
        ...DEFAULT_FORM_DATA,
        jobRole: 'Research Scientist',
        department: 'Research & Development',
        educationField: 'Life Sciences',
        education: 4,
        overtime: 'No',
        monthlyIncome: 5800,
        jobSatisfaction: 3,
        environmentSatisfaction: 4,
        workLifeBalance: 3,
      };
    } else {
      preset = DEFAULT_FORM_DATA;
    }
    setFormData(preset);
    setResult(predictAttrition(preset));
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Presets Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Employee Attrition Prediction
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure employee parameters below to generate real-time flight risk intelligence.
          </p>
        </div>

        {/* 3D Tactile Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#FF5E00]" /> Archetypes:
          </span>
          <button
            onClick={() => applyPreset('default')}
            className="btn-3d-secondary px-3 py-1.5 text-xs shadow-xs"
          >
            Baseline
          </button>
          <button
            onClick={() => applyPreset('highRisk')}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-orange-50 hover:bg-orange-100 text-[#C2410C] border border-orange-200/90 shadow-xs transition-transform active:scale-95"
          >
            High Risk Case
          </button>
          <button
            onClick={() => applyPreset('stable')}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-xs transition-transform active:scale-95"
          >
            Retained Senior
          </button>
          <button
            onClick={() => applyPreset('researcher')}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-transform active:scale-95"
          >
            R&amp;D Scientist
          </button>
          <button
            onClick={handleReset}
            title="Reset to default baseline"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#FF5E00] hover:border-orange-200 shadow-xs transition-all active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Personal Demographics</span>
              <span className="text-xs text-slate-400">Age, commuting distance, and education</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              6 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.personal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.personal && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            <ModernSlider
              label="Age"
              subtitle="Current employee age"
              value={formData.age}
              min={18}
              max={60}
              unit=" yrs"
              onChange={(v) => updateField('age', v)}
              minLabel="18 yrs"
              maxLabel="60 yrs"
            />

            <ModernSlider
              label="Distance From Home"
              subtitle="Daily commute radius"
              value={formData.distanceFromHome}
              min={1}
              max={30}
              unit=" mi"
              onChange={(v) => updateField('distanceFromHome', v)}
              minLabel="1 mi"
              maxLabel="30 mi"
            />

            <ModernSlider
              label="Education Level"
              subtitle={`Level ${formData.education} (${['Below College', 'College', 'Bachelor', 'Master', 'Doctor'][formData.education - 1]})`}
              value={formData.education}
              min={1}
              max={5}
              onChange={(v) => updateField('education', v)}
              minLabel="1 (Below)"
              maxLabel="5 (Doctor)"
            />

            <SegmentedControl
              label="Gender"
              subtitle="Demographic profile"
              value={formData.gender}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
              onChange={(v) => updateField('gender', v as Gender)}
            />

            <SegmentedControl
              label="Marital Status"
              subtitle="Household mobility"
              value={formData.maritalStatus}
              options={[
                { value: 'Married', label: 'Married' },
                { value: 'Single', label: 'Single', badge: 'High Mobility' },
                { value: 'Divorced', label: 'Divorced' },
              ]}
              onChange={(v) => updateField('maritalStatus', v as MaritalStatus)}
            />

            <ModernSelect
              label="Education Field"
              subtitle="Academic domain"
              value={formData.educationField}
              options={[
                { value: 'Life Sciences', label: 'Life Sciences' },
                { value: 'Medical', label: 'Medical' },
                { value: 'Marketing', label: 'Marketing' },
                { value: 'Technical Degree', label: 'Technical Degree' },
                { value: 'Other', label: 'Other' },
                { value: 'Human Resources', label: 'Human Resources' },
              ]}
              onChange={(v) => updateField('educationField', v as EducationField)}
            />
          </div>
        )}
      </div>

      {/* 2. JOB INFORMATION */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('job')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Role &amp; Operational Context</span>
              <span className="text-xs text-slate-400">Position, overtime demands, and department</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              6 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.job ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.job && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            <ModernSelect
              label="Job Role"
              subtitle="Specific functional title"
              value={formData.jobRole}
              options={[
                { value: 'Sales Executive', label: 'Sales Executive' },
                { value: 'Research Scientist', label: 'Research Scientist' },
                { value: 'Laboratory Technician', label: 'Laboratory Technician' },
                { value: 'Manufacturing Director', label: 'Manufacturing Director' },
                { value: 'Healthcare Representative', label: 'Healthcare Representative' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Sales Representative', label: 'Sales Representative' },
                { value: 'Research Director', label: 'Research Director' },
                { value: 'Human Resources', label: 'Human Resources' },
              ]}
              onChange={(v) => updateField('jobRole', v as JobRole)}
            />

            <SegmentedControl
              label="Overtime Demand"
              subtitle="Key attrition driver (+0.252 log-odds)"
              value={formData.overtime}
              options={[
                { value: 'No', label: 'No (Standard)' },
                { value: 'Yes', label: 'Yes (Frequent)', badge: 'Risk Driver' },
              ]}
              onChange={(v) => updateField('overtime', v as OvertimeStatus)}
            />

            <ModernSelect
              label="Department"
              subtitle="Organizational unit"
              value={formData.department}
              options={[
                { value: 'Research & Development', label: 'Research & Development' },
                { value: 'Sales', label: 'Sales' },
                { value: 'Human Resources', label: 'Human Resources' },
              ]}
              onChange={(v) => updateField('department', v as Department)}
            />

            <ModernSlider
              label="Job Level"
              subtitle={`Seniority tier: Level ${formData.jobLevel}`}
              value={formData.jobLevel}
              min={1}
              max={5}
              onChange={(v) => updateField('jobLevel', v)}
              minLabel="1 (Junior)"
              maxLabel="5 (Exec)"
            />

            <ModernSlider
              label="Job Involvement"
              subtitle={`${['Low', 'Medium', 'High', 'Very High'][formData.jobInvolvement - 1]} engagement`}
              value={formData.jobInvolvement}
              min={1}
              max={4}
              onChange={(v) => updateField('jobInvolvement', v)}
              minLabel="1 (Low)"
              maxLabel="4 (High)"
            />

            <ModernSelect
              label="Business Travel"
              subtitle="Travel frequency"
              value={formData.businessTravel}
              options={[
                { value: 'Travel_Rarely', label: 'Travel Rarely' },
                { value: 'Travel_Frequently', label: 'Travel Frequently' },
                { value: 'Non-Travel', label: 'Non-Travel' },
              ]}
              onChange={(v) => updateField('businessTravel', v as BusinessTravel)}
            />
          </div>
        )}
      </div>

      {/* 3. COMPENSATION */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('compensation')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Compensation &amp; Equity</span>
              <span className="text-xs text-slate-400">Monthly salary, rate schedules, and equity grants</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              6 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.compensation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.compensation && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            <ModernSlider
              label="Monthly Income"
              subtitle="Base employee salary"
              value={formData.monthlyIncome}
              min={1000}
              max={25000}
              step={250}
              prefix="$"
              onChange={(v) => updateField('monthlyIncome', v)}
              minLabel="$1,000"
              maxLabel="$25,000"
            />

            <ModernSlider
              label="Daily Rate"
              subtitle="Contract/billing valuation"
              value={formData.dailyRate}
              min={100}
              max={2000}
              step={20}
              prefix="$"
              onChange={(v) => updateField('dailyRate', v)}
              minLabel="$100"
              maxLabel="$2,000"
            />

            <ModernSlider
              label="Hourly Rate"
              subtitle="Standard hourly rate"
              value={formData.hourlyRate}
              min={10}
              max={100}
              prefix="$"
              onChange={(v) => updateField('hourlyRate', v)}
              minLabel="$10/hr"
              maxLabel="$100/hr"
            />

            <ModernSlider
              label="Monthly Rate"
              subtitle="Total departmental cost"
              value={formData.monthlyRate}
              min={1000}
              max={30000}
              step={500}
              prefix="$"
              onChange={(v) => updateField('monthlyRate', v)}
              minLabel="$1,000"
              maxLabel="$30,000"
            />

            <ModernSlider
              label="Salary Hike %"
              subtitle="Last merit increment"
              value={formData.percentSalaryHike}
              min={0}
              max={30}
              unit="%"
              onChange={(v) => updateField('percentSalaryHike', v)}
              minLabel="0%"
              maxLabel="30%"
            />

            <SegmentedControl
              label="Stock Option Level"
              subtitle="Retention anchor (-0.247 coef)"
              value={formData.stockOptionLevel}
              options={[
                { value: 0, label: '0 (None)' },
                { value: 1, label: '1 (Tier 1)' },
                { value: 2, label: '2 (Tier 2)' },
                { value: 3, label: '3 (Tier 3)' },
              ]}
              onChange={(v) => updateField('stockOptionLevel', Number(v))}
            />
          </div>
        )}
      </div>

      {/* 4. EXPERIENCE */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Tenure &amp; Career Trajectory</span>
              <span className="text-xs text-slate-400">Company longevity, promotions, and manager relationships</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              6 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.experience ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.experience && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            <ModernSlider
              label="Total Working Years"
              subtitle="Cumulative career experience"
              value={formData.totalWorkingYears}
              min={0}
              max={40}
              unit=" yrs"
              onChange={(v) => updateField('totalWorkingYears', v)}
              minLabel="0 yrs"
              maxLabel="40 yrs"
            />

            <ModernSlider
              label="Prior Companies Worked"
              subtitle="External job switching frequency"
              value={formData.numCompaniesWorked}
              min={0}
              max={10}
              onChange={(v) => updateField('numCompaniesWorked', v)}
              minLabel="0"
              maxLabel="10"
            />

            <ModernSlider
              label="Years At Company"
              subtitle="Longevity within organization"
              value={formData.yearsAtCompany}
              min={0}
              max={40}
              unit=" yrs"
              onChange={(v) => updateField('yearsAtCompany', v)}
              minLabel="0 yrs"
              maxLabel="40 yrs"
            />

            <ModernSlider
              label="Years In Current Role"
              subtitle="Tenure in same specific title"
              value={formData.yearsInCurrentRole}
              min={0}
              max={20}
              unit=" yrs"
              onChange={(v) => updateField('yearsInCurrentRole', v)}
              minLabel="0 yrs"
              maxLabel="20 yrs"
            />

            <ModernSlider
              label="Years Since Promotion"
              subtitle="Key stagnation risk (+0.264 coef)"
              value={formData.yearsSinceLastPromotion}
              min={0}
              max={15}
              unit=" yrs"
              onChange={(v) => updateField('yearsSinceLastPromotion', v)}
              minLabel="0 yrs"
              maxLabel="15 yrs"
            />

            <ModernSlider
              label="Years With Current Manager"
              subtitle="Protective managerial bond (-0.143)"
              value={formData.yearsWithCurrManager}
              min={0}
              max={20}
              unit=" yrs"
              onChange={(v) => updateField('yearsWithCurrManager', v)}
              minLabel="0 yrs"
              maxLabel="20 yrs"
            />
          </div>
        )}
      </div>

      {/* 5. SATISFACTION METRICS */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('satisfaction')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Workplace Satisfaction &amp; Culture</span>
              <span className="text-xs text-slate-400">Environment rating, role fulfillment, and work-life balance</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              4 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.satisfaction ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.satisfaction && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-200">
            <SegmentedControl
              label="Environment Satisfaction"
              subtitle="Workplace culture (-0.258)"
              value={formData.environmentSatisfaction}
              options={[
                { value: 1, label: '1 (Low)' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4 (High)' },
              ]}
              onChange={(v) => updateField('environmentSatisfaction', Number(v))}
            />

            <SegmentedControl
              label="Job Satisfaction"
              subtitle="Daily fulfillment (-0.228)"
              value={formData.jobSatisfaction}
              options={[
                { value: 1, label: '1 (Low)' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4 (High)' },
              ]}
              onChange={(v) => updateField('jobSatisfaction', Number(v))}
            />

            <SegmentedControl
              label="Relationship Satisfaction"
              subtitle="Peer &amp; team cohesion"
              value={formData.relationshipSatisfaction}
              options={[
                { value: 1, label: '1 (Low)' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4 (High)' },
              ]}
              onChange={(v) => updateField('relationshipSatisfaction', Number(v))}
            />

            <SegmentedControl
              label="Work-Life Balance"
              subtitle="Burnout insulation (-0.133)"
              value={formData.workLifeBalance}
              options={[
                { value: 1, label: '1 (Poor)' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4 (Great)' },
              ]}
              onChange={(v) => updateField('workLifeBalance', Number(v))}
            />
          </div>
        )}
      </div>

      {/* 6. PERFORMANCE METRICS */}
      <div className="card-3d overflow-hidden">
        <button
          onClick={() => toggleSection('performance')}
          className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E00]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block">Performance &amp; Professional Growth</span>
              <span className="text-xs text-slate-400">Annual appraisal score and training sessions attended</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">
              2 Fields
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-transform">
              {openSections.performance ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </button>

        {openSections.performance && (
          <div className="p-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-200">
            <SegmentedControl
              label="Performance Rating"
              subtitle="Formal review appraisal"
              value={formData.performanceRating}
              options={[
                { value: 1, label: '1 (Low)' },
                { value: 2, label: '2 (Good)' },
                { value: 3, label: '3 (High)' },
                { value: 4, label: '4 (Outstanding)' },
              ]}
              onChange={(v) => updateField('performanceRating', Number(v))}
            />

            <ModernSlider
              label="Training Sessions Last Year"
              subtitle="Skill investment count"
              value={formData.trainingTimesLastYear}
              min={0}
              max={10}
              unit=" sessions"
              onChange={(v) => updateField('trainingTimesLastYear', v)}
              minLabel="0"
              maxLabel="10"
            />
          </div>
        )}
      </div>

      {/* 3D TACTILE ACTION BUTTON */}
      <div className="pt-2">
        <button
          onClick={handlePredict}
          disabled={isCalculating}
          className="btn-3d-orange w-full h-16 flex items-center justify-center gap-3 text-lg sm:text-xl font-bold cursor-pointer group"
        >
          <Sparkles className={`w-6 h-6 transition-transform ${isCalculating ? 'animate-spin' : 'group-hover:rotate-12'}`} />
          <span>{isCalculating ? 'Computing Logistic Inference...' : '🚀 Predict Employee Attrition'}</span>
        </button>
      </div>

      {/* 3D PREDICTION RESULT SECTION */}
      {result && (
        <div className="pt-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Prediction Intelligence Report</span>
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Evaluated against calibrated 30.00% departure threshold
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Decision Cutoff</span>
              <span className="text-xs font-mono font-bold text-[#FF5E00]">0.30 Probability</span>
            </div>
          </div>

          {/* 3D PRIMARY RESULT BANNER */}
          {result.isHighRisk ? (
            <div className="card-3d p-6 bg-gradient-to-r from-orange-50 via-rose-50/50 to-white border-2 border-orange-300 shadow-md shadow-orange-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5E00] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30 animate-pulse">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                    Alert Status
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    High Attrition Flight Risk
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
                    Probability of departure exceeds the 30% retention alert threshold. Immediate HR intervention recommended.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-orange-100/90 border border-orange-300 text-[#C2410C] font-mono text-sm font-extrabold shrink-0">
                Risk Score: {result.leaveProbability.toFixed(1)}%
              </div>
            </div>
          ) : (
            <div className="card-3d p-6 bg-gradient-to-r from-emerald-50 via-white to-white border-2 border-emerald-300 shadow-md shadow-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Retention Status
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Employee Likely To Stay
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
                    Retention probability is high. Protective factors currently outweigh voluntary exit triggers.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-sm font-extrabold shrink-0">
                Stay Score: {result.stayProbability.toFixed(1)}%
              </div>
            </div>
          )}

          {/* SIDE-BY-SIDE PROBABILITY 3D TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card-3d p-6 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Stay Probability
                </span>
                <div className="text-4xl font-extrabold text-emerald-600 mt-1 font-mono tracking-tight">
                  {result.stayProbability.toFixed(2)}%
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Expected retention likelihood</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xl">
                {result.stayProbability >= 50 ? '🛡️' : '⚠️'}
              </div>
            </div>

            <div className="card-3d p-6 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Leave Probability
                </span>
                <div
                  className={`text-4xl font-extrabold mt-1 font-mono tracking-tight ${
                    result.isHighRisk ? 'text-[#FF5E00]' : 'text-slate-700'
                  }`}
                >
                  {result.leaveProbability.toFixed(2)}%
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Cutoff benchmark: 30.00%</span>
              </div>
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold text-xl ${
                  result.isHighRisk
                    ? 'bg-orange-50 border-orange-200 text-[#FF5E00]'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
              >
                {result.isHighRisk ? '🚨' : '✅'}
              </div>
            </div>
          </div>

          {/* 3D CONFIDENCE METER */}
          <div className="card-3d p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">Model Inference Confidence</span>
              <span className="text-xs font-mono font-bold text-slate-700">
                {result.confidence.toFixed(1)}% statistical certainty
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              {result.confidence >= 80 ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  🟢 High Confidence Inference
                </span>
              ) : result.confidence >= 60 ? (
                <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  🟡 Moderate Confidence
                </span>
              ) : (
                <span className="text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                  🔴 Borderline Uncertainty
                </span>
              )}
            </div>

            {/* 3D Gauge Progress Bar */}
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.confidence >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : result.confidence >= 60
                    ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                    : 'bg-gradient-to-r from-orange-500 to-rose-400'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* FACTOR DRIVERS EXPLAINABILITY & RETENTION ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Top Drivers */}
            <div className="card-3d p-6 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-[#FF5E00]" />
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Top Influencing Factors for Profile
                </h4>
              </div>
              <div className="space-y-2.5">
                {result.topDrivers.length > 0 ? (
                  result.topDrivers.map((driver) => (
                    <div
                      key={driver.feature}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs"
                    >
                      <span className="text-slate-800 font-semibold">{driver.description}</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                          driver.direction === 'increases_risk'
                            ? 'bg-orange-100 text-[#C2410C] border border-orange-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {driver.direction === 'increases_risk' ? '+ Elevates Risk' : '- Anchors Retention'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Baseline profile factors balanced.</p>
                )}
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="card-3d p-6 bg-gradient-to-br from-white to-orange-50/30 border border-orange-100">
              <div className="flex items-center gap-2 mb-4 text-[#FF5E00]">
                <Lightbulb className="w-4 h-4 text-[#FF5E00]" />
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Recommended Retention Interventions
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {formData.overtime === 'Yes' && (
                  <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-orange-200/60 shadow-2xs">
                    <span className="text-[#FF5E00] font-bold">1.</span>
                    <span>
                      <strong className="text-slate-800">Rebalance Overtime:</strong> Regular overtime is the #2 overall attrition driver. Evaluate team workload redistribution.
                    </span>
                  </li>
                )}
                {formData.yearsSinceLastPromotion >= 3 && (
                  <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-orange-200/60 shadow-2xs">
                    <span className="text-[#FF5E00] font-bold">2.</span>
                    <span>
                      <strong className="text-slate-800">Career Advancement Review:</strong> Employee has spent {formData.yearsSinceLastPromotion} years without promotion. Schedule a path review.
                    </span>
                  </li>
                )}
                {formData.stockOptionLevel === 0 && (
                  <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-orange-200/60 shadow-2xs">
                    <span className="text-[#FF5E00] font-bold">3.</span>
                    <span>
                      <strong className="text-slate-800">Equity Incentive:</strong> Tier 1 or 2 stock grants provide high statistical retention anchoring (-0.247 coefficient).
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 font-bold">&bull;</span>
                  <span>
                    <strong className="text-slate-800">1-on-1 Pulse Check:</strong> Discuss environment satisfaction rating ({formData.environmentSatisfaction}/4) with line management.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
