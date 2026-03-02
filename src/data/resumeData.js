// ============================================================
//  Sandeep Muhal – Portfolio Data  (sourced from resume)
// ============================================================

export const personalInfo = {
    name: "Sandeep Muhal",
    title: "ML & Deep Learning Engineer",
    location: "Kishangarh, Ajmer, Rajasthan",
    email: "sandeepmuhal8840@gmail.com",
    phone: "+91 7879496344",
    github: "https://github.com/SandeepMuhal88",
    linkedin: "https://www.linkedin.com/in/sandeep-muhal-5672aa285/",
    portfolio: "https://sandeepmuhal88.github.io/sandeep-portfolio-website/",
    kaggle: "https://www.kaggle.com/sandeepmuhal88",
    instagram: "https://www.instagram.com/i_sandeepmuhal8/",
    youtube: "https://www.youtube.com/@sandeepmuhal88",
    twitter: "https://x.com/i_sandeepmuhal8",
    resume: "https://drive.google.com/file/d/1fW5KR9a3Wpi0U6mbrdy484tXGDHTwa_j/view?usp=drive_link",
    summary:
        "Machine Learning & Deep Learning engineer with hands-on experience in LLMs, Transformers, LangChain, FastAPI, RAG pipelines, NLP, Computer Vision, and Mobile AI Integration using Flutter. Skilled in building end-to-end ML pipelines, model deployment using FastAPI & Docker, and full-stack AI application development.",
    roles: [
        "ML & Deep Learning Engineer",
        "LLM & NLP Specialist",
        "FastAPI & Docker Developer",
        "Flutter AI App Builder",
    ],
};

export const education = {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    university: "Bikaner Technical University",
    duration: "Aug 2022 – Aug 2026 (Expected)",
    location: "Rajasthan, India",
    cgpa: "7.93 / 10.0",
    courses: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Deep Learning",
        "Python",
        "SQL",
        "C / C++",
        "DBMS",
        "Computer Networks",
    ],
};

export const skillCategories = [
    {
        category: "Programming",
        icon: "💻",
        color: "blue",
        skills: ["Python", "Dart", "C", "C++", "SQL", "JavaScript"],
    },
    {
        category: "Machine Learning",
        icon: "🤖",
        color: "purple",
        skills: ["Regression", "Classification", "Feature Engineering", "Model Optimization"],
    },
    {
        category: "Deep Learning",
        icon: "🧠",
        color: "cyan",
        skills: ["CNN", "RNN / LSTM", "Transfer Learning", "Vision Models"],
    },
    {
        category: "LLMs & NLP",
        icon: "🔮",
        color: "violet",
        skills: ["BERT", "GPT", "T5", "LLaMA", "LangChain", "Prompt Engineering", "Embeddings", "RAG", "FAISS"],
    },
    {
        category: "Frameworks & Libraries",
        icon: "📦",
        color: "green",
        skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "NLTK", "HuggingFace"],
    },
    {
        category: "Backend & Deployment",
        icon: "🚀",
        color: "orange",
        skills: ["FastAPI", "Docker", "REST APIs", "Streamlit", "Git / GitHub"],
    },
    {
        category: "Mobile Development",
        icon: "📱",
        color: "pink",
        skills: ["Flutter", "Dart", "AI Model Integration"],
    },
    {
        category: "Tools & Visualization",
        icon: "📊",
        color: "yellow",
        skills: ["Matplotlib", "Seaborn", "pandas-profiling", "BeautifulSoup", "Jupyter", "VS Code"],
    },
];

export const projects = [
    {
        title: "Potato Disease Detection System",
        description:
            "Built a CNN-based deep learning model to detect Early Blight, Late Blight, and Healthy leaf images. Developed a FastAPI backend, integrated with a Flutter mobile app and containerised via Docker.",
        tech: ["CNN", "PyTorch", "Flutter", "FastAPI", "Docker"],
        highlights: [
            "CNN model for plant disease classification",
            "FastAPI backend serving the DL model",
            "Full end-to-end Flutter mobile app",
            "Dockerized for reliable deployment",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: true,
        category: "Computer Vision",
    },
    {
        title: "Brain Tumor Classification using CNN",
        description:
            "Developed a CNN architecture to classify MRI images into tumor / no-tumor categories with high accuracy. Implemented Grad-CAM heatmaps for model explainability.",
        tech: ["CNN", "Python", "PyTorch", "OpenCV"],
        highlights: [
            "MRI image multi-class classification",
            "Optimized preprocessing & augmentation",
            "Grad-CAM heatmaps for explainability",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: true,
        category: "Medical AI",
    },
    {
        title: "Laptop Price Prediction API",
        description:
            "Built a regression model predicting laptop prices using CPU, RAM, storage, GPU, and brand features. Deployed as a FastAPI endpoint and containerised with Docker.",
        tech: ["Machine Learning", "Scikit-Learn", "FastAPI", "Docker"],
        highlights: [
            "Regression model for price prediction",
            "FastAPI real-time prediction endpoint",
            "Dockerized cross-system deployment",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: true,
        category: "ML Deployment",
    },
    {
        title: "LLM-based Applications",
        description:
            "Implemented LangChain workflows for document Q&A, summarization, embeddings, and RAG pipelines. Fine-tuned transformer models and created GPT/Codex prototypes for code generation.",
        tech: ["GPT", "BERT", "T5", "LLaMA", "LangChain", "FAISS"],
        highlights: [
            "Document Q&A & summarization pipelines",
            "RAG with FAISS vector DB",
            "Fine-tuned transformers for classification",
            "GPT & Codex code-generation prototypes",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: true,
        category: "LLMs & NLP",
    },
    {
        title: "Movie Recommendation System",
        description:
            "Developed a hybrid recommendation engine combining collaborative and content-based filtering with feature engineering and hyperparameter tuning.",
        tech: ["Python", "Pandas", "Scikit-learn", "Cosine Similarity"],
        highlights: [
            "Hybrid collaborative + content-based filtering",
            "Feature engineering & hyperparameter tuning",
            "Cosine similarity for item matching",
        ],
        github: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Movie_Recommnder_System_Project",
        demo: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Movie_Recommnder_System_Project",
        featured: false,
        category: "Machine Learning",
    },
    {
        title: "SMS Spam Detection",
        description:
            "Built a real-time SMS classification system using NLP preprocessing (tokenization, TF-IDF). Achieved high accuracy with Logistic Regression and Naive Bayes. Interactive Streamlit app.",
        tech: ["Python", "NLTK", "Scikit-learn", "Streamlit", "TF-IDF"],
        highlights: [
            "NLP preprocessing pipeline",
            "Logistic Regression & Naive Bayes classifiers",
            "Interactive Streamlit web app",
        ],
        github: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/SMS_Spam_Classifiers",
        demo: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/SMS_Spam_Classifiers",
        featured: false,
        category: "NLP",
    },
    {
        title: "Face Mask Detection",
        description:
            "Implemented a CNN model to detect whether a person is wearing a mask in real-time. Trained on open-source dataset and integrated OpenCV for live video inference.",
        tech: ["TensorFlow", "Keras", "CNN", "OpenCV"],
        highlights: [
            "Real-time mask detection via webcam",
            "OpenCV live video inference",
            "Image preprocessing pipeline",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: false,
        category: "Computer Vision",
    },
    {
        title: "Image Caption Generator",
        description:
            "Developed a model generating descriptive captions by combining CNN and LSTM networks. Used pretrained VGG16 for features and trained on Flickr8k dataset.",
        tech: ["TensorFlow", "Keras", "CNN", "LSTM", "VGG16"],
        highlights: [
            "CNN + LSTM caption generation",
            "Pretrained VGG16 feature extraction",
            "Trained on Flickr8k dataset",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: false,
        category: "Deep Learning",
    },
    {
        title: "Cat Classifier using CNN",
        description:
            "Built an image classifier to distinguish cats from non-cat images. Designed and trained a CNN with ReLU activations and max pooling.",
        tech: ["Python", "TensorFlow", "Keras", "CNN"],
        highlights: [
            "Binary image classification",
            "ReLU & max-pooling architecture",
            "Custom CNN design & training",
        ],
        github: "https://github.com/SandeepMuhal88",
        demo: null,
        featured: false,
        category: "Computer Vision",
    },
];

export const achievements = [
    "Completed 10+ ML/DL & LLM-based projects with working demos and GitHub repositories.",
    "Active contributor on Kaggle, improving rank through competitions.",
    "Built production-ready end-to-end AI apps integrating FastAPI backend + Flutter frontend.",
    "Implemented RAG pipelines using LangChain, FAISS, and transformer embeddings.",
    "Containerised ML services with Docker for repeatable cross-platform deployment.",
];
