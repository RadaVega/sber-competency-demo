import type {
  OrgUnit,
  Employee,
  Mentor,
  DevelopmentMilestone,
  TeamRole,
  AgentStep,
} from "./types";

export const orgUnit: OrgUnit = {
  organization: "Сбер",
  division: "AI Transformation",
  headcount: 500,
  strategicGoal: "Внедрение Agentic AI в контактный центр",
  readiness: 54,
  competencyCoverage: 67,
  mentorshipCoverage: 41,
  teamReadiness: 58,
  risks: [
    { name: "Agentic AI", severity: "high" },
    { name: "AI Governance", severity: "high" },
    { name: "Change Management", severity: "medium" },
  ],
  targetReadiness: 81,
  timelineMonths: 12,
};

export const employee: Employee = {
  id: "emp-001",
  name: "Иван Петров",
  role: "Product Manager",
  targetRole: "Head of AI Products",
  currentCompetencies: [
    "Product Discovery",
    "Agile",
    "SQL",
    "Data Analytics",
    "Stakeholder Management",
  ],
  readinessCurrentRole: 78,
  readinessTargetRole: 62,
  criticalGaps: [
    "Agentic AI",
    "AI Product Strategy",
    "AI Governance",
    "LLM Architecture",
  ],
  radar: [
    { name: "Product Discovery", current: 88, required: 80 },
    { name: "Agentic AI", current: 22, required: 85 },
    { name: "AI Product Strategy", current: 35, required: 80 },
    { name: "AI Governance", current: 18, required: 70 },
    { name: "LLM Architecture", current: 15, required: 65 },
    { name: "Stakeholder Mgmt", current: 82, required: 75 },
  ],
};

export const mentors: Mentor[] = [
  {
    id: "mentor-001",
    name: "Александр Смирнов",
    role: "Head of AI Products",
    matchPercent: 87,
    strengths: ["Agentic AI", "AI Product Strategy", "AI Transformation"],
    reason:
      "Уже провёл два пилота Agentic AI в продуктовых командах Сбера и закрывает ровно те пробелы, что выявлены у Ивана.",
  },
  {
    id: "mentor-002",
    name: "Екатерина Волкова",
    role: "Director, AI Governance",
    matchPercent: 79,
    strengths: ["AI Governance", "Risk & Compliance", "Responsible AI"],
    reason:
      "Формирует политику AI Governance для группы Сбера — закрывает второй по приоритету пробел Ивана.",
  },
  {
    id: "mentor-003",
    name: "Дмитрий Орлов",
    role: "Principal AI Architect",
    matchPercent: 74,
    strengths: ["LLM Architecture", "Multi-Agent Systems", "MLOps"],
    reason:
      "Технический архитектор GigaChat-интеграций — может закрыть пробел в LLM Architecture за один цикл наставничества.",
  },
];

export const developmentPlan: DevelopmentMilestone[] = [
  {
    period: "30",
    label: "Первые 30 дней",
    items: ["AI Fundamentals", "GigaChat", "Prompt Engineering"],
  },
  {
    period: "60",
    label: "Следующие 60 дней",
    items: ["Agentic AI", "Multi-Agent Systems", "AI Governance"],
  },
  {
    period: "90",
    label: "Следующие 90 дней",
    items: ["Участие в пилотном AI-проекте"],
  },
];

export const teamRoles: TeamRole[] = [
  {
    role: "Product Lead",
    requiredCompetencies: ["AI Product Strategy", "Stakeholder Management"],
    coverage: 71,
    risks: ["Ограниченный опыт запуска agentic-продуктов"],
  },
  {
    role: "AI Architect",
    requiredCompetencies: ["LLM Architecture", "Multi-Agent Systems", "MLOps"],
    coverage: 48,
    risks: ["Дефицит экспертизы в production multi-agent системах"],
  },
  {
    role: "Data Analyst",
    requiredCompetencies: ["SQL", "Data Analytics", "A/B-тестирование"],
    coverage: 83,
    risks: [],
  },
  {
    role: "Change Manager",
    requiredCompetencies: ["Change Management", "Internal Communications"],
    coverage: 39,
    risks: ["Критический дефицит — основной риск проекта"],
  },
  {
    role: "Business Sponsor",
    requiredCompetencies: ["AI Governance", "P&L Ownership"],
    coverage: 65,
    risks: ["Требуется ускоренное погружение в AI Governance"],
  },
];

export interface DivisionReadiness {
  name: string;
  headcount: number;
  readiness: number;
  trend: "up" | "flat" | "down";
  strategicGoal: string;
  topRisk: string;
}

export const divisions: DivisionReadiness[] = [
  {
    name: "AI Transformation",
    headcount: 500,
    readiness: 54,
    trend: "up",
    strategicGoal: "Внедрение Agentic AI в контактный центр",
    topRisk: "Agentic AI",
  },
  {
    name: "Розничный бизнес",
    headcount: 1240,
    readiness: 61,
    trend: "up",
    strategicGoal: "Персонализация клиентского пути на базе AI",
    topRisk: "AI Product Strategy",
  },
  {
    name: "Корпоративный блок",
    headcount: 890,
    readiness: 47,
    trend: "flat",
    strategicGoal: "Автоматизация кредитного андеррайтинга",
    topRisk: "AI Governance",
  },
  {
    name: "Технологии и данные",
    headcount: 2100,
    readiness: 72,
    trend: "up",
    strategicGoal: "Платформа MLOps для всей группы",
    topRisk: "LLM Architecture",
  },
  {
    name: "Риски и комплаенс",
    headcount: 410,
    readiness: 39,
    trend: "down",
    strategicGoal: "AI-мониторинг операционных рисков",
    topRisk: "AI Governance",
  },
];

export const agentChain: AgentStep[] = [
  {
    id: "agent-1",
    name: "Внутренние таланты",
    nameEn: "Internal Talent Agent",
    description: "Сканирует внутреннюю базу сотрудников, выявляет доступные компетенции и экспертов.",
  },
  {
    id: "agent-2",
    name: "Внешняя экосистема",
    nameEn: "External Talent Agent",
    description: "Запрашивает Точку Сборки — студентов, специалистов, экспертов и команды.",
  },
  {
    id: "agent-3",
    name: "Анализ компетенций",
    nameEn: "Competency Agent",
    description: "Сопоставляет внутренние и внешние профили с требованиями стратегической задачи.",
  },
  {
    id: "agent-4",
    name: "Анализ дефицитов",
    nameEn: "Gap Analysis Agent",
    description: "Определяет критические пробелы и рассчитывает риск для каждой роли.",
  },
  {
    id: "agent-5",
    name: "Подбор наставников",
    nameEn: "Mentor Agent",
    description: "Находит наставников внутри и в экосистеме, закрывающих выявленные пробелы.",
  },
  {
    id: "agent-6",
    name: "Формирование команды",
    nameEn: "Team Formation Agent",
    description: "Собирает оптимальную команду из внутренних и внешних талантов.",
  },
  {
    id: "agent-7",
    name: "Рекомендация руководителю",
    nameEn: "Executive Recommendation Agent",
    description: "Формирует executive summary с прогнозом и планом действий.",
  },
];
