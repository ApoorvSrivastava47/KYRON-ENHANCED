# KYRON — Workforce Stability Prediction & Organizational Analytics Engine

An intelligent, AI-powered workforce retention analytics and employee attrition prediction platform rewritten from Streamlit/Python into **React + TypeScript + Vite**.

## Features

- **Trained Binary Classification Engine**: Replicates the exact mathematical inference of the original IBM HR Analytics Logistic Regression model ($z = w^T x + b$, sigmoid probability mapping) client-side with 0ms latency.
- **Decision Threshold Optimization**: Calibrated at 0.30 probability cutoff to prioritize Recall over Precision, minimizing costly false negatives in organizational flight risk.
- **Multi-Factor Employee Profiling**:
  - Personal Information (Age, Distance from Home, Education Level, Gender, Marital Status)
  - Job Information (Job Role, Overtime Status, Job Level, Job Involvement, Department, Business Travel)
  - Compensation (Monthly Income, Daily Rate, Hourly Rate, Monthly Rate, Percent Salary Hike, Stock Option Level)
  - Experience Metrics (Total Working Years, Number of Companies Worked, Years at Company, Years in Role, Years Since Last Promotion, Years with Current Manager)
  - Satisfaction & Well-Being Metrics (Environment Satisfaction, Job Satisfaction, Relationship Satisfaction, Work-Life Balance)
  - Performance & Training (Performance Rating, Training Sessions Last Year)
- **Explainability & Risk Factor Attribution**: Highlights the top risk-escalating factors (e.g. OverTime, Years Without Promotion) and protective retention anchors (e.g. Stock Options, Environment Satisfaction).
- **Interactive Analytics Dashboard**: Provides feature weights, benchmark attrition rates by department, role vulnerability indices, and an interactive threshold sensitivity tuner.
- **Scenario Presets**: Instant testing with pre-calibrated employee archetypes (Baseline, Flight Risk Case, Retained Veteran, R&D Scientist).

## Tech Stack

- **Runtime**: Node.js 22
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS (preserving original Dark Theme with `#0E1117` background and `#00E5FF` to `#00FF95` gradients)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
