export type ProjectStatus = "Live" | "Building" | "Queued";

export type PlanetProject = {
  id: string;
  planet: string;
  name: string;
  subtitle: string;
  categoryIcon: string;
  color: string;
  secondaryColor: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
  hasRing?: boolean;
  ringColor?: string;
  ringTilt?: number;
  tags: string[];
  description: string;
  status: ProjectStatus;
  github?: string;
  liveUrl?: string;
  moons?: PlanetProject[];
};

export const sunProfile = {
  name: "Saujan Parajuli",
  title: "Computer Science Student · AI/ML Engineer",
  school: "Computer Science Student · UT Arlington",
  tagline: "Building intelligent systems from scratch",
  color: "#FDB813"
};

export const projects: PlanetProject[] = [
  {
    id: "neuralforge",
    planet: "Mercury",
    name: "NeuralForge Academy",
    subtitle: "Interactive AI curriculum engine",
    categoryIcon: "🧠",
    color: "#A8A9AD",
    secondaryColor: "#6f7178",
    radius: 0.82,
    orbitRadius: 8,
    orbitSpeed: 0.78,
    orbitTilt: 0.08,
    tags: ["Next.js", "Python", "D3.js", "Pyodide"],
    description:
      "LLM/ML teaching platform with 25 interactive lessons, live code execution, and D3 visualizations covering the full deep learning curriculum from perceptrons to diffusion models.",
    status: "Live",
    github: "https://github.com/boyedandtoyed/neuralforge-academy",
    liveUrl: "https://neuralforge.binodtiwari.com"
  },
  {
    id: "documind",
    planet: "Venus",
    name: "DocuMind",
    subtitle: "Local production RAG engine",
    categoryIcon: "📚",
    color: "#E8CDA0",
    secondaryColor: "#b8844b",
    radius: 1.08,
    orbitRadius: 11.5,
    orbitSpeed: 0.58,
    orbitTilt: -0.05,
    tags: ["FastAPI", "LangGraph", "Qdrant", "Neo4j", "RAGAS"],
    description:
      "Production RAG engine with hybrid dense+sparse search, knowledge graph enrichment, and automatic hallucination scoring. Runs 100% locally on Tesla P40.",
    status: "Building",
    github: "https://github.com/boyedandtoyed/documind",
    liveUrl: "https://documind.binodtiwari.com"
  },
  {
    id: "pipelineguard",
    planet: "Earth",
    name: "PipelineGuard",
    subtitle: "AI DevOps pipeline sentinel",
    categoryIcon: "🛰️",
    color: "#4B9CD3",
    secondaryColor: "#36b37e",
    radius: 1.18,
    orbitRadius: 15,
    orbitSpeed: 0.46,
    orbitTilt: 0.03,
    tags: ["LangGraph", "MCP", "GitHub Actions", "Slack", "PostgreSQL"],
    description:
      "AI DevOps agent that monitors CI/CD pipelines, auto-diagnoses failures, and posts fixes to Slack. Integrates with GitHub Actions via MCP.",
    status: "Queued",
    liveUrl: "https://pipelineguard.binodtiwari.com"
  },
  {
    id: "researchcrew",
    planet: "Mars",
    name: "ResearchCrew",
    subtitle: "Multi-agent research system",
    categoryIcon: "🔎",
    color: "#C1440E",
    secondaryColor: "#f17b48",
    radius: 1.02,
    orbitRadius: 18.7,
    orbitSpeed: 0.37,
    orbitTilt: -0.09,
    tags: ["CrewAI", "Tavily", "LlamaIndex", "Qdrant", "Streamlit"],
    description:
      "Multi-agent deep research system. Specialized agents search, synthesize, and fact-check in parallel, producing cited research reports evaluated by RAGAS.",
    status: "Queued",
    liveUrl: "https://researchcrew.binodtiwari.com"
  },
  {
    id: "dataflowagent",
    planet: "Jupiter",
    name: "DataFlowAgent",
    subtitle: "Conversational data pipelines",
    categoryIcon: "📊",
    color: "#C88B3A",
    secondaryColor: "#f1c27b",
    radius: 2.18,
    orbitRadius: 24,
    orbitSpeed: 0.26,
    orbitTilt: 0.05,
    hasRing: true,
    ringColor: "#d8a75e",
    ringTilt: 0.18,
    tags: ["AutoGen 0.4", "MCP", "DuckDB", "Pandas", "Plotly", "FastAPI"],
    description:
      "Conversational AI agent that connects to databases, writes and executes data pipelines on the fly, and generates interactive Plotly dashboards from natural language queries.",
    status: "Queued",
    liveUrl: "https://dataflowagent.binodtiwari.com",
    moons: [
      {
        id: "modelforge",
        planet: "Jupiter Moon",
        name: "ModelForge",
        subtitle: "LLM fine-tuning toolkit",
        categoryIcon: "🧪",
        color: "#9B59B6",
        secondaryColor: "#d5a6e6",
        radius: 0.42,
        orbitRadius: 3.2,
        orbitSpeed: 1.25,
        orbitTilt: 0.35,
        tags: ["QLoRA", "Unsloth", "vLLM", "W&B", "PEFT"],
        description:
          "End-to-end LLM fine-tuning toolkit with QLoRA, Unsloth acceleration, vLLM serving, and W&B experiment tracking.",
        status: "Queued",
        liveUrl: "https://modelforge.binodtiwari.com"
      }
    ]
  },
  {
    id: "defectscope",
    planet: "Saturn",
    name: "DefectScope",
    subtitle: "Industrial vision inspection",
    categoryIcon: "👁️",
    color: "#E4D191",
    secondaryColor: "#bfa56a",
    radius: 1.92,
    orbitRadius: 30.2,
    orbitSpeed: 0.19,
    orbitTilt: -0.04,
    hasRing: true,
    ringColor: "#f0dfaa",
    ringTilt: 0.48,
    tags: ["YOLOE", "SAM2", "Gradio", "PyTorch", "TensorRT"],
    description:
      "Real-time industrial defect detection using YOLOE object detection + SAM2 segmentation. TensorRT optimized for edge GPU deployment. Gradio demo interface.",
    status: "Queued",
    liveUrl: "https://defectscope.binodtiwari.com",
    moons: [
      {
        id: "mlpipelinex",
        planet: "Saturn Moon",
        name: "MLPipelineX",
        subtitle: "End-to-end MLOps",
        categoryIcon: "⚙️",
        color: "#2ECC71",
        secondaryColor: "#9af0bf",
        radius: 0.45,
        orbitRadius: 3.6,
        orbitSpeed: 1.04,
        orbitTilt: -0.28,
        tags: ["MLflow", "Airflow", "Evidently AI", "Prometheus", "Grafana"],
        description:
          "Full MLOps pipeline: experiment tracking, automated retraining, drift detection, and Grafana monitoring dashboards.",
        status: "Queued",
        liveUrl: "https://mlpipelinex.binodtiwari.com"
      }
    ]
  },
  {
    id: "contractlens",
    planet: "Uranus",
    name: "ContractLens",
    subtitle: "Legal NLP risk analysis",
    categoryIcon: "⚖️",
    color: "#7DE8E8",
    secondaryColor: "#4bb2c2",
    radius: 1.44,
    orbitRadius: 36,
    orbitSpeed: 0.14,
    orbitTilt: 0.08,
    hasRing: true,
    ringColor: "#a6ffff",
    ringTilt: 1.15,
    tags: ["Legal-BERT", "SpaCy", "CUAD", "Streamlit", "Pydantic"],
    description:
      "NLP system for legal contract analysis. Extracts clauses, flags risky terms, and summarizes obligations using Legal-BERT fine-tuned on the CUAD dataset.",
    status: "Queued",
    liveUrl: "https://contractlens.binodtiwari.com"
  },
  {
    id: "quantumshield",
    planet: "Neptune",
    name: "QuantumShield",
    subtitle: "Post-quantum security layer",
    categoryIcon: "🛡️",
    color: "#3F54BA",
    secondaryColor: "#80a3ff",
    radius: 1.48,
    orbitRadius: 41.5,
    orbitSpeed: 0.105,
    orbitTilt: -0.06,
    hasRing: true,
    ringColor: "#7d91ff",
    ringTilt: 0.12,
    tags: ["liboqs", "ML-DSA-65", "ML-KEM-768", "FastAPI", "Next.js"],
    description:
      "Post-quantum cryptography API and wallet UI. Implements NIST-standardized ML-DSA-65 signatures and ML-KEM-768 key encapsulation, a quantum-resistant security layer.",
    status: "Queued",
    liveUrl: "https://quantumshield.binodtiwari.com"
  }
];

export const allProjects = projects.flatMap((project) => [project, ...(project.moons ?? [])]);
