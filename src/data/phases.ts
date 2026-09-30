import { PhaseInfo } from '../types/roadmap';

export const PHASES: PhaseInfo[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Python Foundations",
    daysRange: "Days 1–15",
    startDay: 1,
    endDay: 15,
    iconName: "Code2",
    category: "python",
    outcome: "Write Python programs confidently and understand the programming foundations required for AI/ML.",
    projectTitle: "Expense Tracker",
    color: "#2563EB",
    learnOutcomes: [
      "Master Python syntax, types, and logic structures",
      "Write modular functions and handle exceptions",
      "Manipulate data with lists, dictionaries, and sets",
      "Build command-line utility tools and handle files"
    ]
  },
  {
    id: 2,
    numberStr: "02",
    title: "Data Analysis",
    daysRange: "Days 16–25",
    startDay: 16,
    endDay: 25,
    iconName: "BarChart3",
    category: "data",
    outcome: "Load, clean, analyze and visualize real datasets.",
    projectTitle: "Student Performance Analysis",
    color: "#F4B400",
    learnOutcomes: [
      "Vectorized operations and arrays with NumPy",
      "Data wrangling and transformations with Pandas",
      "Handle missing values, outliers, and duplicates",
      "Craft insightful charts with Matplotlib & Seaborn"
    ]
  },
  {
    id: 3,
    numberStr: "03",
    title: "Machine Learning",
    daysRange: "Days 26–40",
    startDay: 26,
    endDay: 40,
    iconName: "Cpu",
    category: "ml",
    outcome: "Train your first practical machine learning models.",
    projectTitle: "Customer Purchase Prediction",
    color: "#16A34A",
    learnOutcomes: [
      "Understand supervised vs unsupervised learning",
      "Master regression & classification mathematics intuitively",
      "Train Linear Regression, Logistic Regression, KNN & SVM",
      "Build decision trees and ensemble random forests"
    ]
  },
  {
    id: 4,
    numberStr: "04",
    title: "Model Evaluation",
    daysRange: "Days 41–50",
    startDay: 41,
    endDay: 50,
    iconName: "LineChart",
    category: "ml",
    outcome: "Understand whether your model is actually performing well.",
    projectTitle: "Customer Churn Prediction",
    color: "#DC2626",
    learnOutcomes: [
      "Decouple accuracy from real business utility",
      "Master Confusion Matrix, Precision, Recall & F1-Score",
      "Diagnose Overfitting vs Underfitting like a pro",
      "Execute K-Fold Cross Validation & Grid Hyperparameter Tuning"
    ]
  },
  {
    id: 5,
    numberStr: "05",
    title: "Advanced Machine Learning",
    daysRange: "Days 51–60",
    startDay: 51,
    endDay: 60,
    iconName: "Sliders",
    category: "ml",
    outcome: "Improve models using preprocessing, feature engineering and advanced algorithms.",
    projectTitle: "Recommendation System",
    color: "#9333EA",
    learnOutcomes: [
      "Feature engineering, scaling & categorical encoding",
      "Compare Normalization vs Standardization impacts",
      "Master boosting algorithms: AdaBoost, Gradient Boosting & XGBoost",
      "Build real-world collaborative recommendation engines"
    ]
  },
  {
    id: 6,
    numberStr: "06",
    title: "Deep Learning",
    daysRange: "Days 61–70",
    startDay: 61,
    endDay: 70,
    iconName: "Network",
    category: "deep-learning",
    outcome: "Understand neural networks and build an image classification model.",
    projectTitle: "Image Classification App",
    color: "#EA580C",
    learnOutcomes: [
      "Intuition of neurons, weights, bias & activation functions",
      "How forward and backpropagation calculate gradients",
      "Build Artificial Neural Networks (ANN) in TensorFlow/Keras",
      "Design Convolutional Neural Networks (CNN) for computer vision"
    ]
  },
  {
    id: 7,
    numberStr: "07",
    title: "Generative AI",
    daysRange: "Days 71–80",
    startDay: 71,
    endDay: 80,
    iconName: "Sparkles",
    category: "genai",
    outcome: "Understand LLMs, embeddings, vector databases and RAG.",
    projectTitle: "Chat With Your PDF",
    color: "#0284C7",
    learnOutcomes: [
      "Foundations of Transformers, tokens & modern LLMs",
      "Generate and compare dense vector embeddings",
      "Index data into Vector Databases (Chroma/FAISS)",
      "Build production Retrieval-Augmented Generation (RAG) pipelines"
    ]
  },
  {
    id: 8,
    numberStr: "08",
    title: "AI Agents",
    daysRange: "Days 81–87",
    startDay: 81,
    endDay: 87,
    iconName: "Bot",
    category: "agents",
    outcome: "Build AI systems that can use tools and perform multi-step tasks.",
    projectTitle: "AI Research Assistant",
    color: "#4F46E5",
    learnOutcomes: [
      "Difference between simple LLM prompts and autonomous agents",
      "Implement OpenAI/Claude/Gemini function calling & tool use",
      "Orchestrate multi-step reasoning with Python workflows",
      "Connect live external APIs for autonomous research and execution"
    ]
  },
  {
    id: 9,
    numberStr: "09",
    title: "Deployment & Portfolio",
    daysRange: "Days 88–90",
    startDay: 88,
    endDay: 90,
    iconName: "Rocket",
    category: "deployment",
    outcome: "Deploy your application and prepare your AI/ML portfolio.",
    projectTitle: "AI Job Assistant",
    color: "#16A34A",
    learnOutcomes: [
      "Build reactive, production-ready web apps with Streamlit",
      "Construct end-to-end AI Job Assistant combining RAG + Agents",
      "Package clean GitHub repositories with professional documentation",
      "Craft an industry-ready AI/ML resume, LinkedIn & portfolio showcase"
    ]
  }
];
