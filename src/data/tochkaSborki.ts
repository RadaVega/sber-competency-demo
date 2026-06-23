// External talent ecosystem — Tochka Sborki (Точка Сборки)
// https://tochka-sborki-five.vercel.app/
// Mock data representing what the platform would surface via API.

export type TalentCategory = "student" | "specialist" | "expert" | "mentor" | "team";

export interface ExternalTalent {
  id: string;
  name: string;
  category: TalentCategory;
  competencies: string[];
  readiness: number;  // 0-100 — how ready to engage on a real project
  developmentPotential: "high" | "medium" | "low";
  university?: string;  // for students
  experience?: string;  // for specialists/experts
}

export interface ExternalTeam {
  id: string;
  name: string;
  size: number;
  focus: string;
  competencies: string[];
  projectsCompleted: number;
}

export const externalTalent: ExternalTalent[] = [
  // Students
  {
    id: "ts-001",
    name: "Анна Козлова",
    category: "student",
    competencies: ["Python", "Machine Learning", "Data Analysis"],
    readiness: 62,
    developmentPotential: "high",
    university: "ВШЭ · Программная инженерия",
  },
  {
    id: "ts-002",
    name: "Михаил Захаров",
    category: "student",
    competencies: ["LLM Fine-tuning", "Prompt Engineering", "RAG Systems"],
    readiness: 71,
    developmentPotential: "high",
    university: "МФТИ · Прикладная математика",
  },
  {
    id: "ts-003",
    name: "Дарья Никитина",
    category: "student",
    competencies: ["UX Research", "Product Design", "User Testing"],
    readiness: 58,
    developmentPotential: "high",
    university: "Сколтех · Инновации",
  },

  // Specialists
  {
    id: "ts-004",
    name: "Роман Калинин",
    category: "specialist",
    competencies: ["Agentic AI", "LangChain", "Python", "API Integration"],
    readiness: 83,
    developmentPotential: "high",
    experience: "2 года · AI-стартапы",
  },
  {
    id: "ts-005",
    name: "Елена Морозова",
    category: "specialist",
    competencies: ["AI Governance", "Risk Management", "Compliance"],
    readiness: 76,
    developmentPotential: "medium",
    experience: "3 года · Финансовый сектор",
  },
  {
    id: "ts-006",
    name: "Дмитрий Кузнецов",
    category: "specialist",
    competencies: ["Change Management", "Organizational Design", "Agile"],
    readiness: 79,
    developmentPotential: "high",
    experience: "4 года · Консалтинг",
  },

  // Experts
  {
    id: "ts-007",
    name: "Павел Сергеев",
    category: "expert",
    competencies: ["Agentic AI", "Multi-Agent Systems", "LLM Architecture", "AI Product Strategy"],
    readiness: 92,
    developmentPotential: "high",
    experience: "7 лет · AI Research & Development",
  },
  {
    id: "ts-008",
    name: "Наталья Иванова",
    category: "expert",
    competencies: ["AI Transformation", "Digital Strategy", "Executive Coaching"],
    readiness: 89,
    developmentPotential: "medium",
    experience: "9 лет · Digital Transformation",
  },

  // Mentors
  {
    id: "ts-009",
    name: "Алексей Громов",
    category: "mentor",
    competencies: ["Prompt Engineering", "LLM Fine-tuning", "AI Product Strategy"],
    readiness: 95,
    developmentPotential: "high",
    experience: "10 лет · AI/ML Engineering",
  },
  {
    id: "ts-010",
    name: "Светлана Беляева",
    category: "mentor",
    competencies: ["AI Governance", "Responsible AI", "AI Ethics"],
    readiness: 91,
    developmentPotential: "medium",
    experience: "12 лет · Technology Policy",
  },
];

export const externalTeams: ExternalTeam[] = [
  {
    id: "team-001",
    name: "AI Agents Lab",
    size: 4,
    focus: "Agentic AI & Multi-Agent Systems",
    competencies: ["Agentic AI", "LangChain", "Python", "API Design"],
    projectsCompleted: 6,
  },
  {
    id: "team-002",
    name: "LLM Integration Team",
    size: 3,
    focus: "Production LLM Integration",
    competencies: ["LLM Architecture", "RAG Systems", "Prompt Engineering"],
    projectsCompleted: 4,
  },
  {
    id: "team-003",
    name: "AI Governance Squad",
    size: 3,
    focus: "Responsible AI & Compliance",
    competencies: ["AI Governance", "Risk Management", "Policy Design"],
    projectsCompleted: 3,
  },
];

// The WOW demo numbers — reused across all 4 modes
export const hybridCoverage = {
  internalOnly: 67,
  withEcosystem: 89,
  gaps: ["Agentic AI", "AI Governance", "Prompt Engineering"],
  externalFill: [
    { gap: "Agentic AI", source: "2 эксперта, 1 команда из Точки Сборки" },
    { gap: "AI Governance", source: "1 ментор, 1 специалист из Точки Сборки" },
    { gap: "Prompt Engineering", source: "1 ментор, 2 специалиста из Точки Сборки" },
  ],
};

// Talent source modes
export type TalentSourceMode = "internal" | "external" | "hybrid";

export const talentSourceLabels: Record<TalentSourceMode, { en: string; ru: string }> = {
  internal: { en: "Internal Workforce", ru: "Внутренние сотрудники" },
  external: { en: "External Ecosystem", ru: "Внешняя экосистема" },
  hybrid: { en: "Hybrid Talent Network", ru: "Гибридная сеть талантов" },
};
