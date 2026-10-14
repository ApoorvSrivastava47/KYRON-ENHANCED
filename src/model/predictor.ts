import { EmployeeFormData, PredictionResult } from '../types';
import {
  MODEL_COEFFICIENTS,
  MODEL_FEATURE_NAMES,
  MODEL_INTERCEPT,
} from './modelData';

export const DEFAULT_FORM_DATA: EmployeeFormData = {
  // Personal
  age: 35,
  distanceFromHome: 9,
  education: 3,
  gender: 'Male',
  maritalStatus: 'Married',
  educationField: 'Life Sciences',

  // Job
  jobRole: 'Sales Executive',
  overtime: 'No',
  jobLevel: 2,
  jobInvolvement: 3,
  department: 'Research & Development',
  businessTravel: 'Travel_Rarely',

  // Compensation
  monthlyIncome: 5000,
  dailyRate: 800,
  hourlyRate: 65,
  monthlyRate: 14000,
  percentSalaryHike: 14,
  stockOptionLevel: 1,

  // Experience
  totalWorkingYears: 10,
  numCompaniesWorked: 2,
  yearsAtCompany: 5,
  yearsInCurrentRole: 3,
  yearsSinceLastPromotion: 1,
  yearsWithCurrManager: 3,

  // Satisfaction
  environmentSatisfaction: 3,
  jobSatisfaction: 3,
  relationshipSatisfaction: 3,
  workLifeBalance: 3,

  // Performance
  performanceRating: 3,
  trainingTimesLastYear: 2,
};

export function buildFeatureVector(data: EmployeeFormData): Record<string, number> {
  const features: Record<string, number> = {};
  for (const name of MODEL_FEATURE_NAMES) {
    features[name] = 0;
  }

  // Numerical inputs
  features['Age'] = data.age;
  features['MonthlyIncome'] = data.monthlyIncome;
  features['TotalWorkingYears'] = data.totalWorkingYears;
  features['DailyRate'] = data.dailyRate;
  features['DistanceFromHome'] = data.distanceFromHome;
  features['Education'] = data.education;
  features['EnvironmentSatisfaction'] = data.environmentSatisfaction;
  features['HourlyRate'] = data.hourlyRate;
  features['JobInvolvement'] = data.jobInvolvement;
  features['JobLevel'] = data.jobLevel;
  features['JobSatisfaction'] = data.jobSatisfaction;
  features['MonthlyRate'] = data.monthlyRate;
  features['NumCompaniesWorked'] = data.numCompaniesWorked;
  features['PercentSalaryHike'] = data.percentSalaryHike;
  features['PerformanceRating'] = data.performanceRating;
  features['RelationshipSatisfaction'] = data.relationshipSatisfaction;
  features['StockOptionLevel'] = data.stockOptionLevel;
  features['TrainingTimesLastYear'] = data.trainingTimesLastYear;
  features['WorkLifeBalance'] = data.workLifeBalance;
  features['YearsAtCompany'] = data.yearsAtCompany;
  features['YearsInCurrentRole'] = data.yearsInCurrentRole;
  features['YearsSinceLastPromotion'] = data.yearsSinceLastPromotion;
  features['YearsWithCurrManager'] = data.yearsWithCurrManager;

  // Constants
  features['EmployeeCount'] = 1;
  features['EmployeeNumber'] = 1;
  features['StandardHours'] = 80;

  // OverTime
  if (data.overtime === 'Yes') {
    features['OverTime_Yes'] = 1;
  }

  // Business Travel
  if (data.businessTravel === 'Travel_Frequently') {
    features['BusinessTravel_Travel_Frequently'] = 1;
  } else if (data.businessTravel === 'Travel_Rarely') {
    features['BusinessTravel_Travel_Rarely'] = 1;
  }

  // Department
  if (data.department === 'Research & Development') {
    features['Department_Research & Development'] = 1;
  } else if (data.department === 'Sales') {
    features['Department_Sales'] = 1;
  }

  // Education Field
  if (data.educationField === 'Life Sciences') {
    features['EducationField_Life Sciences'] = 1;
  } else if (data.educationField === 'Marketing') {
    features['EducationField_Marketing'] = 1;
  } else if (data.educationField === 'Medical') {
    features['EducationField_Medical'] = 1;
  } else if (data.educationField === 'Other') {
    features['EducationField_Other'] = 1;
  } else if (data.educationField === 'Technical Degree') {
    features['EducationField_Technical Degree'] = 1;
  }

  // Gender
  if (data.gender === 'Male') {
    features['Gender_Male'] = 1;
  }

  // Marital Status
  if (data.maritalStatus === 'Married') {
    features['MaritalStatus_Married'] = 1;
  } else if (data.maritalStatus === 'Single') {
    features['MaritalStatus_Single'] = 1;
  }

  // Job Role Encoding
  const jobMap: Record<string, string> = {
    'Human Resources': 'JobRole_Human Resources',
    'Laboratory Technician': 'JobRole_Laboratory Technician',
    Manager: 'JobRole_Manager',
    'Manufacturing Director': 'JobRole_Manufacturing Director',
    'Research Director': 'JobRole_Research Director',
    'Research Scientist': 'JobRole_Research Scientist',
    'Sales Executive': 'JobRole_Sales Executive',
    'Sales Representative': 'JobRole_Sales Representative',
  };

  if (data.jobRole in jobMap) {
    features[jobMap[data.jobRole]] = 1;
  }

  return features;
}

export function predictAttrition(data: EmployeeFormData, customThreshold = 0.30): PredictionResult {
  const featureVector = buildFeatureVector(data);

  let z = MODEL_INTERCEPT;
  const contributions: { feature: string; impact: number; description: string; direction: 'increases_risk' | 'decreases_risk' }[] = [];

  for (let i = 0; i < MODEL_FEATURE_NAMES.length; i++) {
    const featureName = MODEL_FEATURE_NAMES[i];
    const val = featureVector[featureName] ?? 0;
    const coef = MODEL_COEFFICIENTS[i];
    const term = coef * val;
    z += term;

    // Record non-constant contributing terms for explainability
    if (
      !['EmployeeCount', 'EmployeeNumber', 'StandardHours'].includes(featureName) &&
      Math.abs(term) > 0.05
    ) {
      contributions.push({
        feature: featureName,
        impact: Math.abs(term),
        description: getFeatureFriendlyLabel(featureName, val),
        direction: term > 0 ? 'increases_risk' : 'decreases_risk',
      });
    }
  }

  // Sigmoid probability calculation (matching scikit-learn binary LogisticRegression)
  const leaveProb = 1 / (1 + Math.exp(-z));
  const stayProb = 1 - leaveProb;

  const stayPercentage = Number((stayProb * 100).toFixed(2));
  const leavePercentage = Number((leaveProb * 100).toFixed(2));

  const isHighRisk = leaveProb >= customThreshold;
  const confidence = Math.max(stayPercentage, leavePercentage);

  let confidenceLevel: 'High' | 'Moderate' | 'Low' = 'Low';
  if (confidence >= 80) {
    confidenceLevel = 'High';
  } else if (confidence >= 60) {
    confidenceLevel = 'Moderate';
  }

  // Sort drivers by magnitude of impact
  contributions.sort((a, b) => b.impact - a.impact);

  return {
    stayProbability: stayPercentage,
    leaveProbability: leavePercentage,
    rawLeaveProb: leaveProb,
    isHighRisk,
    confidence,
    confidenceLevel,
    topDrivers: contributions.slice(0, 5),
  };
}

function getFeatureFriendlyLabel(name: string, value: number): string {
  switch (name) {
    case 'OverTime_Yes':
      return 'Regular Overtime Demand';
    case 'YearsSinceLastPromotion':
      return `${value} Years Without Promotion`;
    case 'NumCompaniesWorked':
      return `${value} Prior Companies Worked`;
    case 'YearsWithCurrManager':
      return `${value} Years With Current Manager`;
    case 'YearsInCurrentRole':
      return `${value} Years in Same Role`;
    case 'EnvironmentSatisfaction':
      return `Environment Satisfaction Rating (${value}/4)`;
    case 'JobSatisfaction':
      return `Job Satisfaction Rating (${value}/4)`;
    case 'StockOptionLevel':
      return `Stock Option Incentive Level (${value}/3)`;
    case 'Age':
      return `Employee Age (${value} yrs)`;
    case 'MonthlyIncome':
      return `Base Compensation ($${value.toLocaleString()}/mo)`;
    case 'MaritalStatus_Single':
      return 'Single Marital Status (higher mobility)';
    case 'DistanceFromHome':
      return `Commute Distance (${value} miles)`;
    case 'JobInvolvement':
      return `Job Involvement Rating (${value}/4)`;
    case 'WorkLifeBalance':
      return `Work-Life Balance Rating (${value}/4)`;
    default:
      return name.replace(/_/g, ' ');
  }
}
