import streamlit as st
import numpy as np

# ============================================================
# PAGE CONFIGURATION
# ============================================================
st.set_page_config(
    page_title="KYRON — Workforce Retention Engine",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ============================================================
# ORANGISH & WHITE MINIMALISTIC CSS & SF PRO STYLING
# ============================================================
CUSTOM_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

html, body, [class*="css"], .stApp {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Plus Jakarta Sans", sans-serif;
    background-color: #F8F9FB;
    color: #0F172A;
}

/* Header & Container spacing */
.block-container {
    max-width: 1360px;
    padding-top: 2rem;
    padding-bottom: 3rem;
}

/* Hero Box with Orangish & White 3D Depth */
.hero-box {
    background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 65%, #FFF7ED 100%);
    border: 1px solid #FED7AA;
    border-radius: 20px;
    padding: 32px 36px;
    margin-bottom: 24px;
    box-shadow: 0 10px 25px -5px rgba(255, 94, 0, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.03);
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    background-color: #FFF7ED;
    border: 1px solid #FED7AA;
    color: #EA580C;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 12px;
}

.hero-title {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.15;
    color: #0F172A;
    letter-spacing: -0.02em;
}

.hero-title span {
    background: linear-gradient(90deg, #FF5E00, #FF8C38);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    color: #64748B;
    font-size: 16px;
    margin-top: 8px;
    line-height: 1.5;
}

/* 3D KPI Metric Cards */
[data-testid="stMetric"] {
    background: #FFFFFF !important;
    border: 1px solid #E2E8F0 !important;
    border-radius: 16px !important;
    padding: 18px 20px !important;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03) !important;
    transition: all 0.25s ease !important;
}

[data-testid="stMetric"]:hover {
    transform: translateY(-2px);
    border-color: #FED7AA !important;
    box-shadow: 0 10px 20px -3px rgba(255, 94, 0, 0.08) !important;
}

[data-testid="stMetricLabel"] {
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    color: #94A3B8 !important;
}

[data-testid="stMetricValue"] {
    font-size: 26px !important;
    font-weight: 800 !important;
    color: #0F172A !important;
}

/* Card Sections */
.card-section {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 18px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
}

/* 3D Tactile Result Banners */
.result-danger {
    background: linear-gradient(135deg, #FFF7ED 0%, #FEF2F2 100%);
    color: #991B1B;
    border: 2px solid #FCA5A5;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.2);
    margin: 16px 0;
}

.result-success {
    background: linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%);
    color: #166534;
    border: 2px solid #86EFAC;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.15);
    margin: 16px 0;
}

/* 3D Tactile Orange Predict Button */
.stButton button {
    width: 100% !important;
    height: 60px !important;
    font-size: 18px !important;
    font-weight: 800 !important;
    border-radius: 16px !important;
    border: none !important;
    border-bottom: 4px solid #C2410C !important;
    background: linear-gradient(135deg, #FF6A00 0%, #FF5100 100%) !important;
    color: #FFFFFF !important;
    box-shadow: 0 10px 20px -5px rgba(255, 94, 0, 0.35) !important;
    transition: all 0.15s ease !important;
}

.stButton button:hover {
    filter: brightness(1.05) !important;
    box-shadow: 0 14px 25px -4px rgba(255, 94, 0, 0.45) !important;
}

.stButton button:active {
    transform: translateY(3px) !important;
    border-bottom-width: 1px !important;
}

/* Modernized Sliders and Inputs */
.stSlider div[data-baseweb="slider"] {
    color: #FF5E00 !important;
}

div[data-testid="stExpander"] {
    background: #FFFFFF !important;
    border: 1px solid #E2E8F0 !important;
    border-radius: 16px !important;
    margin-bottom: 14px !important;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02) !important;
}

/* Sidebar styling */
section[data-testid="stSidebar"] {
    background-color: #FFFFFF !important;
    border-right: 1px solid #E2E8F0 !important;
}
</style>
"""
st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

# ============================================================
# EXACT LOGISTIC REGRESSION WEIGHTS (FROM IBM HR MODEL)
# ============================================================
FEATURE_NAMES = [
    "Age", "DailyRate", "DistanceFromHome", "Education", "EmployeeCount",
    "EmployeeNumber", "EnvironmentSatisfaction", "HourlyRate", "JobInvolvement",
    "JobLevel", "JobSatisfaction", "MonthlyIncome", "MonthlyRate", "NumCompaniesWorked",
    "PercentSalaryHike", "PerformanceRating", "RelationshipSatisfaction", "StandardHours",
    "StockOptionLevel", "TotalWorkingYears", "TrainingTimesLastYear", "WorkLifeBalance",
    "YearsAtCompany", "YearsInCurrentRole", "YearsSinceLastPromotion", "YearsWithCurrManager",
    "BusinessTravel_Travel_Frequently", "BusinessTravel_Travel_Rarely",
    "Department_Research & Development", "Department_Sales",
    "EducationField_Life Sciences", "EducationField_Marketing", "EducationField_Medical",
    "EducationField_Other", "EducationField_Technical Degree", "Gender_Male",
    "JobRole_Human Resources", "JobRole_Laboratory Technician", "JobRole_Manager",
    "JobRole_Manufacturing Director", "JobRole_Research Director",
    "JobRole_Research Scientist", "JobRole_Sales Executive", "JobRole_Sales Representative",
    "MaritalStatus_Married", "MaritalStatus_Single", "OverTime_Yes"
]

COEFFICIENTS = [
    -0.07976861280917437, -0.00040639827768503684, 0.04113976657377959,
    0.011771951081301206, 0.0006562019373969188, 3.0743400800291875e-05,
    -0.2577717635873223, -0.003069516483268877, -0.18593502550626778,
    -0.006096297899016763, -0.22785222951521375, -6.654362109030686e-05,
    -1.2634633788931789e-06, 0.20529944757794472, 0.006009344010624378,
    0.02317948705477343, -0.11234273150200477, 0.052496154989533174,
    -0.24669477784585978, -0.04893246260081384, -0.09598775088447616,
    -0.13333083940218973, 0.05123221745277289, -0.12746768793160465,
    0.26379639843582187, -0.14274809192747803, 0.1158066459992279,
    -0.05041086236053493, -0.10671630468073175, 0.09841512743945582,
    -0.005405403755624441, 0.046362963994294855, -0.0560879917149618,
    -0.029525634548342634, 0.029758109560216607, 0.014692586905110732,
    0.010768542887635351, 0.07908776782869473, 0.0034133318310598745,
    -0.040439883531800974, -0.017491093983503552, -0.0867885410663402,
    0.041179039422584995, 0.05408542927404378, -0.08319381231785433,
    0.14834331811230334, 0.252667251806534
]

INTERCEPT = 0.0006572976986131416

def predict_attrition(inputs: dict):
    vec = {col: 0.0 for col in FEATURE_NAMES}
    for k, v in inputs.items():
        if k in vec:
            vec[k] = float(v)
    
    vec["EmployeeCount"] = 1.0
    vec["EmployeeNumber"] = 1.0
    vec["StandardHours"] = 80.0
    
    # One-hot encodings
    if inputs.get("OverTime") == "Yes":
        vec["OverTime_Yes"] = 1.0
    if inputs.get("BusinessTravel") == "Travel_Frequently":
        vec["BusinessTravel_Travel_Frequently"] = 1.0
    elif inputs.get("BusinessTravel") == "Travel_Rarely":
        vec["BusinessTravel_Travel_Rarely"] = 1.0
    if inputs.get("Department") == "Research & Development":
        vec["Department_Research & Development"] = 1.0
    elif inputs.get("Department") == "Sales":
        vec["Department_Sales"] = 1.0
    if inputs.get("EducationField") in [
        "Life Sciences", "Marketing", "Medical", "Other", "Technical Degree"
    ]:
        vec[f"EducationField_{inputs['EducationField']}"] = 1.0
    if inputs.get("Gender") == "Male":
        vec["Gender_Male"] = 1.0
    if inputs.get("MaritalStatus") in ["Married", "Single"]:
        vec[f"MaritalStatus_{inputs['MaritalStatus']}"] = 1.0
    
    job_role = inputs.get("JobRole")
    if job_role in [
        "Human Resources", "Laboratory Technician", "Manager", "Manufacturing Director",
        "Research Director", "Research Scientist", "Sales Executive", "Sales Representative"
    ]:
        vec[f"JobRole_{job_role}"] = 1.0
        
    z = INTERCEPT
    drivers = []
    for i, name in enumerate(FEATURE_NAMES):
        val = vec[name]
        term = COEFFICIENTS[i] * val
        z += term
        if name not in ["EmployeeCount", "EmployeeNumber", "StandardHours"] and abs(term) > 0.05:
            drivers.append((name, term))
            
    prob_leave = 1.0 / (1.0 + np.exp(-z))
    prob_stay = 1.0 - prob_leave
    return prob_stay, prob_leave, sorted(drivers, key=lambda x: abs(x[1]), reverse=True)[:5]

# ============================================================
# HERO HEADER
# ============================================================
st.markdown("""
<div class="hero-box">
    <div class="hero-badge">✦ Calibrated Workforce Intelligence</div>
    <div class="hero-title">Employee Attrition <span>Intelligence</span> Platform</div>
    <div class="hero-subtitle">
        AI-powered organizational analytics engine. Forecast flight risk in real time, identify retention drivers, and proactively retain top talent.
    </div>
</div>
""", unsafe_allow_html=True)

# Top KPI Metric Cards
c1, c2, c3, c4 = st.columns(4)
with c1:
    st.metric("Model Architecture", "Logistic Regression", "Calibrated Sigmoid")
with c2:
    st.metric("Input Features", "47", "Engineered Dimensions")
with c3:
    st.metric("Validation Corpus", "IBM HR", "1,470 Records")
with c4:
    st.metric("Engine Status", "Live Active", "0ms Latency")

st.write("")

# ============================================================
# SIDEBAR NAVIGATION & SPECS
# ============================================================
st.sidebar.markdown("""
<div style="padding: 10px 0 20px 0;">
    <div style="font-size: 22px; font-weight: 800; color: #0F172A; display: flex; align-items: center; gap: 8px;">
        <span style="color: #FF5E00;">KYRON</span> ENGINE
    </div>
    <div style="font-size: 12px; color: #64748B;">Workforce Retention Engine</div>
</div>
""", unsafe_allow_html=True)

st.sidebar.success("✅ Model Loaded & Active")

page = st.sidebar.radio(
    "Navigation",
    ["Prediction", "Analytics", "About Project"],
    index=0
)

st.sidebar.markdown("---")
st.sidebar.markdown("""
**System Specs**
- **Algorithm:** Logistic Regression
- **Predictors:** 47 Encoded
- **Decision Cutoff:** 0.30 Probability
- **Dataset:** IBM HR Analytics
""")

# ============================================================
# PAGE 1: PREDICTION
# ============================================================
if page == "Prediction":
    st.markdown("### 👨 Employee Information & Risk Assessment")
    st.caption("Adjust employee demographic, role, compensation, and satisfaction metrics to forecast flight risk.")

    with st.expander("👤 Personal Demographics", expanded=True):
        p1, p2, p3 = st.columns(3)
        with p1:
            age = st.slider("Age", 18, 60, 35)
            gender = st.selectbox("Gender", ["Male", "Female"], index=0)
        with p2:
            distance_from_home = st.slider("Distance From Home (miles)", 1, 30, 9)
            marital_status = st.selectbox("Marital Status", ["Married", "Single", "Divorced"], index=0)
        with p3:
            education = st.slider("Education Level (1: Below, 5: Doctor)", 1, 5, 3)
            education_field = st.selectbox(
                "Education Field",
                ["Life Sciences", "Medical", "Marketing", "Technical Degree", "Other", "Human Resources"]
            )

    with st.expander("💼 Role & Operational Context", expanded=True):
        j1, j2, j3 = st.columns(3)
        with j1:
            job_role = st.selectbox(
                "Job Role",
                [
                    "Sales Executive", "Research Scientist", "Laboratory Technician",
                    "Manufacturing Director", "Healthcare Representative", "Manager",
                    "Sales Representative", "Research Director", "Human Resources"
                ]
            )
            overtime = st.selectbox("Overtime Status", ["No", "Yes"], index=0)
        with j2:
            department = st.selectbox(
                "Department",
                ["Research & Development", "Sales", "Human Resources"]
            )
            job_level = st.slider("Job Level (Seniority 1-5)", 1, 5, 2)
        with j3:
            business_travel = st.selectbox(
                "Business Travel",
                ["Travel_Rarely", "Travel_Frequently", "Non-Travel"]
            )
            job_involvement = st.slider("Job Involvement (1: Low, 4: High)", 1, 4, 3)

    with st.expander("💰 Compensation & Equity", expanded=True):
        c1, c2, c3 = st.columns(3)
        with c1:
            monthly_income = st.number_input("Monthly Income ($)", min_value=1000, max_value=30000, value=5000, step=250)
            monthly_rate = st.number_input("Monthly Rate ($)", min_value=1000, value=14000, step=500)
        with c2:
            daily_rate = st.number_input("Daily Rate ($)", min_value=100, value=800, step=50)
            percent_salary_hike = st.slider("Salary Hike %", 0, 30, 14)
        with c3:
            hourly_rate = st.slider("Hourly Rate ($)", 10, 100, 65)
            stock_option_level = st.slider("Stock Option Level (0-3)", 0, 3, 1)

    with st.expander("📈 Tenure & Career Trajectory", expanded=True):
        e1, e2, e3 = st.columns(3)
        with e1:
            total_working_years = st.slider("Total Working Years", 0, 40, 10)
            years_at_company = st.slider("Years At Company", 0, 40, 5)
        with e2:
            num_companies_worked = st.slider("Prior Companies Worked", 0, 10, 2)
            years_in_current_role = st.slider("Years In Current Role", 0, 20, 3)
        with e3:
            years_since_last_promotion = st.slider("Years Since Last Promotion", 0, 15, 1)
            years_with_curr_manager = st.slider("Years With Current Manager", 0, 20, 3)

    with st.expander("😊 Workplace Satisfaction & Well-Being", expanded=True):
        s1, s2 = st.columns(2)
        with s1:
            environment_satisfaction = st.slider("Environment Satisfaction (1-4)", 1, 4, 3)
            job_satisfaction = st.slider("Job Satisfaction (1-4)", 1, 4, 3)
        with s2:
            relationship_satisfaction = st.slider("Relationship Satisfaction (1-4)", 1, 4, 3)
            work_life_balance = st.slider("Work-Life Balance (1-4)", 1, 4, 3)

    with st.expander("🎯 Performance & Training", expanded=True):
        p_col1, p_col2 = st.columns(2)
        with p_col1:
            performance_rating = st.slider("Performance Rating (1-4)", 1, 4, 3)
        with p_col2:
            training_times_last_year = st.slider("Training Sessions Last Year", 0, 10, 2)

    predict_btn = st.button("🚀 Predict Employee Attrition", use_container_width=True)

    if predict_btn:
        input_payload = {
            "Age": age, "DailyRate": daily_rate, "DistanceFromHome": distance_from_home,
            "Education": education, "EnvironmentSatisfaction": environment_satisfaction,
            "HourlyRate": hourly_rate, "JobInvolvement": job_involvement, "JobLevel": job_level,
            "JobSatisfaction": job_satisfaction, "MonthlyIncome": monthly_income,
            "MonthlyRate": monthly_rate, "NumCompaniesWorked": num_companies_worked,
            "PercentSalaryHike": percent_salary_hike, "PerformanceRating": performance_rating,
            "RelationshipSatisfaction": relationship_satisfaction, "StockOptionLevel": stock_option_level,
            "TotalWorkingYears": total_working_years, "TrainingTimesLastYear": training_times_last_year,
            "WorkLifeBalance": work_life_balance, "YearsAtCompany": years_at_company,
            "YearsInCurrentRole": years_in_current_role, "YearsSinceLastPromotion": years_since_last_promotion,
            "YearsWithCurrManager": years_with_curr_manager, "Gender": gender,
            "MaritalStatus": marital_status, "EducationField": education_field,
            "JobRole": job_role, "OverTime": overtime, "Department": department,
            "BusinessTravel": business_travel
        }

        prob_stay, prob_leave, drivers = predict_attrition(input_payload)
        stay_pct = prob_stay * 100
        leave_pct = prob_leave * 100

        st.markdown("---")
        st.subheader("📈 Prediction Intelligence Report")
        st.caption(f"Evaluated against calibrated 30.00% departure cutoff. Leave Probability = {leave_pct:.2f}%")

        if prob_leave >= 0.30:
            st.markdown(
                '<div class="result-danger">⚠️ HIGH ATTRITION FLIGHT RISK (Departure Prob &ge; 30%)</div>',
                unsafe_allow_html=True
            )
        else:
            st.markdown(
                '<div class="result-success">✅ EMPLOYEE LIKELY TO STAY (High Retention Likelihood)</div>',
                unsafe_allow_html=True
            )

        col_r1, col_r2 = st.columns(2)
        with col_r1:
            st.metric("Stay Probability", f"{stay_pct:.2f}%")
        with col_r2:
            st.metric("Leave Probability", f"{leave_pct:.2f}%")

        confidence = max(stay_pct, leave_pct)
        if confidence >= 80:
            st.success(f"🟢 High Confidence Prediction ({confidence:.1f}% Certainty)")
        elif confidence >= 60:
            st.warning(f"🟡 Moderate Confidence Prediction ({confidence:.1f}% Certainty)")
        else:
            st.error(f"🔴 Borderline Uncertainty ({confidence:.1f}% Certainty)")

        st.progress(confidence / 100.0)

        if drivers:
            st.write("**Top Contributing Factors for this Profile:**")
            for name, val in drivers:
                direction = "🚨 Elevates Risk (+)" if val > 0 else "🛡️ Protects Retention (-)"
                st.write(f"- **{name.replace('_', ' ')}**: {direction} ({val:+.3f})")

# ============================================================
# PAGE 2: ANALYTICS
# ============================================================
elif page == "Analytics":
    st.markdown("### 📊 Analytics & Model Explanations")
    st.caption("Detailed breakdown of logistic coefficients, threshold tuning, and IBM HR benchmarks.")

    thresh = st.slider("Decision Threshold Sensitivity Tuner", 0.10, 0.60, 0.30, step=0.05)
    st.info(f"**Current Cutoff: {int(thresh*100)}%**. Standard 0.30 cutoff prioritizes Recall to catch flight risks early before resignation.")

    st.write("#### Departmental Baseline Attrition")
    st.table({
        "Department": ["Sales", "Research & Development", "Human Resources"],
        "Headcount": [446, 961, 63],
        "Attrition Rate": ["20.6%", "13.8%", "19.0%"],
        "Risk Assessment": ["High Risk", "Moderate", "High Risk"]
    })

    st.write("#### Key Model Drivers (Logistic Weights)")
    st.write("- **Years Since Last Promotion:** `+0.264` (Strongest stagnation trigger)")
    st.write("- **OverTime Status (Yes):** `+0.253` (Severe burnout amplifier)")
    st.write("- **Number of Companies Worked:** `+0.205` (Elevated job-switching tendency)")
    st.write("- **Environment Satisfaction:** `-0.258` (Top retention anchor)")
    st.write("- **Stock Option Level:** `-0.247` (Strongest equity retention hook)")
    st.write("- **Job Satisfaction:** `-0.228` (Daily role fulfillment buffer)")

# ============================================================
# PAGE 3: ABOUT PROJECT
# ============================================================
elif page == "About Project":
    st.markdown("### ℹ️ About the KYRON Project")
    st.markdown("""
    **KYRON — Workforce Stability Prediction and Organizational Analytics Engine**
    
    This platform predicts voluntary employee attrition using supervised binary classification,
    enabling human resource teams to pivot from reactive exit interviews to proactive retention interventions.

    - **Developer:** Apoorv Srivastava
    - **Institute:** Motilal Nehru National Institute of Technology (MNNIT) Prayagraj
    - **Dataset:** IBM HR Analytics Employee Attrition & Performance Dataset (1,470 records)
    - **Model:** Logistic Regression (47 features, binary cross-entropy loss, calibrated threshold 0.30)
    """)
