import { ProjectInfo } from '../types/roadmap';

export const PROJECTS: ProjectInfo[] = [
  {
    id: "proj-1",
    number: 1,
    title: "Python Expense Tracker",
    phaseId: 1,
    day: 15,
    difficulty: "Beginner",
    outcome: "Build a robust CLI application to log, analyze, categorize, and persist personal finances.",
    skills: ["Python", "File I/O", "Data Structures", "Functions", "Exception Handling"],
    architecture: {
      steps: ["User Input CLI", "Expense Validation", "File/JSON Persistence", "Category Analytics", "Summary Output"],
      diagramFlow: "User Input ➔ Input Validation ➔ Data Structures (Dict/List) ➔ File Storage (JSON/CSV) ➔ Expense Analytics ➔ Formatted CLI Report"
    },
    features: [
      "Add new expense with amount, category, date, and description",
      "Store transactions persistently in local JSON or CSV file",
      "View complete itemized transaction history",
      "Calculate total expenditure and categorical breakdown (Food, Transport, Utilities)",
      "Robust exception handling for invalid numeric inputs or missing files"
    ],
    deliverable: "Python script (expense_tracker.py) + structured README.md + GitHub repository.",
    githubPromptTemplate: "A clean Python command-line expense tracker featuring categorical breakdown, file persistence, and robust error handling."
  },
  {
    id: "proj-2",
    number: 2,
    title: "Student Performance Analysis",
    phaseId: 2,
    day: 25,
    difficulty: "Beginner",
    outcome: "Perform exploratory data analysis (EDA) on educational data to unearth key drivers of academic success.",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning"],
    architecture: {
      steps: ["Dataset Ingestion", "Data Cleaning & Imputation", "Statistical Analysis", "Visualization", "Actionable Insights"],
      diagramFlow: "Raw CSV ➔ Pandas Ingestion ➔ Handle Missing/Duplicates ➔ GroupBy & Aggregations ➔ Seaborn Visualizations ➔ Executive Insights"
    },
    features: [
      "Load and inspect real-world student grading datasets (Kaggle)",
      "Clean anomalies, handle missing values, and normalize column datatypes",
      "Evaluate statistical correlations between study hours, parental education, and test scores",
      "Generate publication-ready Seaborn distribution plots, heatmaps, and pairplots",
      "Summarize top 3 actionable conclusions in an executive markdown report"
    ],
    deliverable: "Jupyter Notebook (.ipynb) with annotated visualizations + GitHub repo + Insights Summary.",
    githubPromptTemplate: "Exploratory Data Analysis examining multi-variate factors impacting student academic performance using Pandas, Matplotlib, and Seaborn."
  },
  {
    id: "proj-3",
    number: 3,
    title: "Customer Purchase Prediction",
    phaseId: 3,
    day: 40,
    difficulty: "Intermediate",
    outcome: "Train and evaluate supervised classification models to predict e-commerce purchase probability.",
    skills: ["Scikit-learn", "Logistic Regression", "Decision Trees", "Random Forest", "Feature Encoding"],
    architecture: {
      steps: ["Customer Data", "Preprocessing & One-Hot", "Train/Test Split", "Model Fitting", "Inference & Prediction"],
      diagramFlow: "Customer Session Data ➔ Data Preprocessing ➔ Train/Test Split (80/20) ➔ Scikit-Learn Model ➔ Purchase Probability Score"
    },
    features: [
      "Process customer demographic and browsing behavioral indicators",
      "Encode categorical variables and scale continuous features",
      "Train benchmark models: Logistic Regression, Decision Tree, and Random Forest",
      "Generate test predictions and probability confidence intervals",
      "Identify the top 5 most influential features driving purchase decisions"
    ],
    deliverable: "Clean Python training pipeline + evaluation report + exported pickle model.",
    githubPromptTemplate: "Binary classification ML pipeline predicting customer conversion probability using Scikit-Learn algorithms."
  },
  {
    id: "proj-4",
    number: 4,
    title: "Customer Churn Prediction",
    phaseId: 4,
    day: 50,
    difficulty: "Intermediate",
    outcome: "Deliver an end-to-end churn detection system with rigorous model evaluation and tradeoff analysis.",
    skills: ["Scikit-learn", "Precision/Recall", "Confusion Matrix", "ROC-AUC", "Cross Validation"],
    architecture: {
      steps: ["Telecom Churn Data", "Balanced Sampling", "K-Fold Cross Validation", "Metric Comparison", "Churn Risk Matrix"],
      diagramFlow: "Customer History ➔ Preprocessing ➔ K-Fold Cross Validation ➔ Hyperparameter Tuning ➔ Precision/Recall Tradeoff ➔ Business Risk Score"
    },
    features: [
      "Formulate telecom customer churn prediction on imbalanced datasets",
      "Calculate and visually plot full Confusion Matrices across decision thresholds",
      "Compare Precision, Recall, F1-Score, and ROC-AUC curves",
      "Fine-tune hyperparameters using GridSearchCV to minimize false negatives",
      "Deliver actionable threshold recommendations balancing cost vs customer retention"
    ],
    deliverable: "Model comparison notebook + confusion matrix charts + GitHub repository with documentation.",
    githubPromptTemplate: "End-to-end customer churn prediction pipeline evaluated with ROC-AUC, precision-recall optimization, and hyperparameter tuning."
  },
  {
    id: "proj-5",
    number: 5,
    title: "Recommendation System",
    phaseId: 5,
    day: 60,
    difficulty: "Intermediate",
    outcome: "Design an intelligent recommendation engine utilizing feature engineering and boosting algorithms.",
    skills: ["Feature Engineering", "Cosine Similarity", "XGBoost", "Categorical Embeddings", "Recommender Systems"],
    architecture: {
      steps: ["Interaction Matrix", "Feature Vectorization", "Similarity Computation", "Ranker Model", "Top-K Recommendations"],
      diagramFlow: "User-Item Interactions ➔ Feature Engineering ➔ Cosine Similarity Matrix ➔ XGBoost Re-Ranker ➔ Personalized Top 5 Recommendations"
    },
    features: [
      "Construct user-item interaction matrices from movie or product datasets",
      "Implement Content-Based filtering using cosine similarity on engineered metadata",
      "Incorporate advanced gradient boosting (XGBoost) for relevance ranking",
      "Address cold-start challenges for newly added items",
      "Interactive prediction function returning top-N personalized items for any user ID"
    ],
    deliverable: "Modular Python recommender package + demonstration notebook + README.",
    githubPromptTemplate: "Hybrid recommendation engine combining content-based filtering with XGBoost re-ranking algorithms on real-world datasets."
  },
  {
    id: "proj-6",
    number: 6,
    title: "Image Classification App",
    phaseId: 6,
    day: 70,
    difficulty: "Advanced",
    outcome: "Develop and train a Convolutional Neural Network (CNN) to accurately classify visual imagery.",
    skills: ["Deep Learning", "TensorFlow", "Keras", "CNNs", "Computer Vision"],
    architecture: {
      steps: ["Image Augmentation", "Convolution & Pooling", "Dense Layers", "Softmax Classification", "Inference Pipeline"],
      diagramFlow: "Image Input ➔ Rescaling & Augmentation ➔ Conv2D + MaxPooling ➔ Flatten & Dense ➔ Softmax Output (Class Probabilities)"
    },
    features: [
      "Ingest benchmark computer vision datasets (CIFAR-10 or Fashion-MNIST)",
      "Implement data augmentation (rotation, zoom, flips) to combat overfitting",
      "Architect a multi-layer CNN with Conv2D, Batch Normalization, and Dropout",
      "Train model with Adam optimizer and track loss & validation accuracy curves",
      "Build a standalone inference function that accepts an image path and returns top predictions"
    ],
    deliverable: "Trained Keras model (.keras / .h5) + training notebook + sample test script with image inputs.",
    githubPromptTemplate: "Deep Learning Convolutional Neural Network (CNN) built in TensorFlow/Keras for multi-class image classification."
  },
  {
    id: "proj-7",
    number: 7,
    title: "Chat With Your PDF",
    phaseId: 7,
    day: 80,
    difficulty: "Advanced",
    outcome: "Architect an end-to-end RAG (Retrieval-Augmented Generation) system to converse with unstructured documents.",
    skills: ["Generative AI", "LangChain / LlamaIndex", "Vector DBs (Chroma/FAISS)", "Embeddings", "LLMs"],
    architecture: {
      steps: ["PDF Ingestion", "Text Chunking", "Embedding Generation", "Vector DB Indexing", "Similarity Search", "LLM Prompt Augmentation"],
      diagramFlow: "PDF File ➔ Text Extraction ➔ Recursive Chunking ➔ Vector Embeddings ➔ ChromaDB Vector Store ➔ Context Retrieval ➔ LLM Response"
    },
    features: [
      "Extract and clean unstructured textual data from uploaded PDF documents",
      "Apply token-aware recursive text chunking with strategic overlaps",
      "Generate dense vector representations using state-of-the-art embedding models",
      "Store and query embeddings with millisecond similarity search in Chroma/FAISS",
      "Augment LLM system prompt with retrieved context to answer queries with zero hallucination and source citations"
    ],
    deliverable: "Fully functional Python RAG pipeline + sample documentation + GitHub repository.",
    githubPromptTemplate: "Retrieval-Augmented Generation (RAG) system enabling interactive conversational Q&A over local PDF documents using Vector Databases and LLMs."
  },
  {
    id: "proj-8",
    number: 8,
    title: "AI Research Assistant",
    phaseId: 8,
    day: 87,
    difficulty: "Advanced",
    outcome: "Construct an autonomous AI agent capable of multi-step reasoning, external tool invocation, and automated synthesis.",
    skills: ["AI Agents", "Function Calling", "API Integration", "ReAct Framework", "Tool Use"],
    architecture: {
      steps: ["User Query", "Agent Reasoning", "Tool Selection & Execution", "API Data Ingestion", "Synthesis & Final Report"],
      diagramFlow: "User Query ➔ Thought/Plan ➔ Action (Call Tool / Search API) ➔ Observation ➔ Reflection Loop ➔ Synthesized Executive Summary"
    },
    features: [
      "Implement autonomous reasoning loop using ReAct (Reason + Act) paradigm",
      "Define schema-validated tools: Web Search, Wikipedia API, and Calculator",
      "Empower the LLM to autonomously decide which tool to call based on user goals",
      "Execute multi-step workflows: search, verify facts, calculate statistics, and summarize",
      "Format the output as a professional research briefing with verified references"
    ],
    deliverable: "Autonomous Python agent repository + tool definitions + terminal demonstration screencast/gif.",
    githubPromptTemplate: "Autonomous multi-step AI Research Agent leveraging LLM tool-calling and API orchestration to perform automated internet research."
  },
  {
    id: "proj-9",
    number: 9,
    title: "AI Job Assistant (Final Capstone)",
    phaseId: 9,
    day: 89,
    difficulty: "Advanced",
    outcome: "Launch a production-grade, deployed interactive AI web application for intelligent resume & job matching.",
    skills: ["Full Pipeline", "Streamlit", "Scikit-Learn", "LLM & RAG", "AI Agent Workflow", "Cloud Deployment"],
    architecture: {
      steps: ["Resume Upload", "Skill Extraction", "JD Parsing & Semantic Match", "Gap Analysis Agent", "Interactive Streamlit UI"],
      diagramFlow: "Candidate Resume (PDF) + Job Description ➔ Text Extraction ➔ Vector Similarity Match ➔ Skill Gap Agent ➔ Streamlit Dashboard"
    },
    features: [
      "Upload resume PDF and paste target job description through an intuitive web interface",
      "Extract technical skills, tools, and experience levels using NLP & LLM parsing",
      "Compute semantic alignment score and match percentage between candidate and role",
      "Autonomous agent suggestions: targeted resume bullet improvements and interview prep questions",
      "Deployed live on Streamlit Cloud or Hugging Face Spaces ready for recruiters and LinkedIn"
    ],
    deliverable: "Live deployed web application URL + complete GitHub codebase + video walkthrough + portfolio showcase.",
    githubPromptTemplate: "Production-ready AI Job & Resume Matcher powered by Streamlit, Scikit-Learn, Embeddings, and AI Agent recommendations."
  }
];
