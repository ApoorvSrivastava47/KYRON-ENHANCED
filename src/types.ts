export type JobRole =
  | 'Sales Executive'
  | 'Research Scientist'
  | 'Laboratory Technician'
  | 'Manufacturing Director'
  | 'Healthcare Representative'
  | 'Manager'
  | 'Sales Representative'
  | 'Research Director'
  | 'Human Resources';

export type OvertimeStatus = 'Yes' | 'No';

export type BusinessTravel =
  | 'Travel_Rarely'
  | 'Travel_Frequently'
  | 'Non-Travel';

export type Department =
  | 'Research & Development'
  | 'Sales'
  | 'Human Resources';

export type EducationField =
  | 'Life Sciences'
  | 'Medical'
  | 'Marketing'
  | 'Technical Degree'
  | 'Other'
  | 'Human Resources';

export type Gender = 'Male' | 'Female';

export type MaritalStatus = 'Married' | 'Single' | 'Divorced';

export interface EmployeeFormData {
  // Personal
  age: number;
  distanceFromHome: number;
  education: number;
  gender: Gender;
  maritalStatus: MaritalStatus;
  educationField: EducationField;

  // Job
  jobRole: JobRole;
  overtime: OvertimeStatus;
  jobLevel: number;
  jobInvolvement: number;
  department: Department;
  businessTravel: BusinessTravel;

  // Compensation
  monthlyIncome: number;
  dailyRate: number;
  hourlyRate: number;
  monthlyRate: number;
  percentSalaryHike: number;
  stockOptionLevel: number;

  // Experience
  totalWorkingYears: number;
  numCompaniesWorked: number;
  yearsAtCompany: number;
  yearsInCurrentRole: number;
  yearsSinceLastPromotion: number;
  yearsWithCurrManager: number;

  // Satisfaction
  environmentSatisfaction: number;
  jobSatisfaction: number;
  relationshipSatisfaction: number;
  workLifeBalance: number;

  // Performance
  performanceRating: number;
  trainingTimesLastYear: number;
}

export interface PredictionResult {
  stayProbability: number;
  leaveProbability: number;
  rawLeaveProb: number;
  isHighRisk: boolean;
  confidence: number;
  confidenceLevel: 'High' | 'Moderate' | 'Low';
  topDrivers: {
    feature: string;
    impact: number;
    description: string;
    direction: 'increases_risk' | 'decreases_risk';
  }[];
}
