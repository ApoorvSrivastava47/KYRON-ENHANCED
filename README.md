# KYRON — Workforce Stability Prediction & Organizational Analytics Engine

An intelligent, AI-powered workforce retention analytics and employee attrition prediction platform built with **React + TypeScript + Vite** and **Streamlit**.

## Live Deployments

- **Web Application URL (AI Studio)**: Live in the preview window & available via the Shared App URL.
- **Streamlit Community Cloud Deployment**: Ready for 1-click deployment from GitHub.

---

## 🚀 Deploying to Streamlit Community Cloud

The repository includes all production files needed to deploy directly on **[Streamlit Community Cloud](https://share.streamlit.io)**:

1. **Push your code to GitHub** (e.g. `main` branch).
2. Go to **[share.streamlit.io](https://share.streamlit.io)** and sign in with your GitHub account.
3. Click **"New app"** and select:
   - **Repository:** `ApoorvSrivastava47/KYRON-Workforce-Stability-Prediction-and-Organizational-Analytics-Engine`
   - **Branch:** `main`
   - **Main file path:** `streamlit_app.py` (or `app.py`)
4. Click **"Deploy!"**. Streamlit Cloud will automatically install `requirements.txt` and apply the Orangish & White theme from `.streamlit/config.toml`.

---

## Features

- **Exact Machine Learning Engine**: Implements the trained IBM HR Analytics Logistic Regression model ($z = \mathbf{w}^T \mathbf{x} + b$, sigmoid probability mapping) client-side with 0ms latency.
- **Decision Threshold Optimization**: Calibrated at 0.30 probability cutoff to prioritize Recall over Precision, minimizing costly false negatives in organizational flight risk.
- **Multi-Factor Employee Profiling**:
  - Personal Information (Age, Distance from Home, Education Level, Gender, Marital Status)
  - Job Information (Job Role, Overtime Status, Job Level, Job Involvement, Department, Business Travel)
  - Compensation (Monthly Income, Daily Rate, Hourly Rate, Monthly Rate, Percent Salary Hike, Stock Option Level)
  - Experience Metrics (Total Working Years, Number of Companies Worked, Years at Company, Years in Role, Years Since Last Promotion, Years with Current Manager)
  - Satisfaction & Well-Being Metrics (Environment Satisfaction, Job Satisfaction, Relationship Satisfaction, Work-Life Balance)
  - Performance & Training (Performance Rating, Training Sessions Last Year)
- **Explainability & Risk Factor Attribution**: Highlights top risk-escalating factors and protective retention anchors.
- **Interactive Analytics Dashboard**: Feature weights, benchmark attrition rates by department, role vulnerability indices, and an interactive threshold sensitivity tuner.
- **Minimalist Orangish & White UI**: SF Pro typography, tactile 3D cards, responsive design.

---

## Development & Local Running

### Run with React + Vite:
```bash
npm install
npm run dev
```

### Run with Streamlit:
```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```
