export interface VKRole {
  role: string;
  requiredCompetencies: string[];
  internalCoverage: number;
  gap: "none" | "partial" | "critical";
}

export interface VKTalent {
  name: string;
  currentRole: string;
  matchPercent: number;
  competencyMatch: string[];
  potential: "leader" | "mentor" | "contributor";
}

export const initiativeExamples = [
  "Создать AI-помощника для VK MAX",
  "Запустить новый образовательный сервис",
  "Создать AI-сервис для VK Видео",
];

export const vkRoles: VKRole[] = [
  {
    role: "AI Product Lead",
    requiredCompetencies: ["Product Strategy", "LLM Integration", "Roadmapping"],
    internalCoverage: 64,
    gap: "partial",
  },
  {
    role: "ML/AI Engineer",
    requiredCompetencies: ["LLM Fine-tuning", "RAG Systems", "Python"],
    internalCoverage: 38,
    gap: "critical",
  },
  {
    role: "Conversational UX Designer",
    requiredCompetencies: ["Dialogue Design", "Prompt UX", "User Research"],
    internalCoverage: 71,
    gap: "none",
  },
  {
    role: "Data Engineer",
    requiredCompetencies: ["Data Pipelines", "Feature Stores", "SQL"],
    internalCoverage: 82,
    gap: "none",
  },
  {
    role: "Growth Analyst",
    requiredCompetencies: ["A/B Testing", "Funnel Analytics"],
    internalCoverage: 76,
    gap: "none",
  },
];

export const vkTalent: VKTalent[] = [
  {
    name: "Мария Соколова",
    currentRole: "Senior Product Manager, VK Видео",
    matchPercent: 91,
    competencyMatch: ["Product Strategy", "Roadmapping", "LLM Integration"],
    potential: "leader",
  },
  {
    name: "Артём Беляков",
    currentRole: "ML Engineer, VK Рекомендации",
    matchPercent: 85,
    competencyMatch: ["RAG Systems", "Python", "LLM Fine-tuning"],
    potential: "mentor",
  },
  {
    name: "Наталья Громова",
    currentRole: "UX Researcher, VK MAX",
    matchPercent: 78,
    competencyMatch: ["User Research", "Dialogue Design"],
    potential: "contributor",
  },
  {
    name: "Игорь Петренко",
    currentRole: "Data Engineer, VK Реклама",
    matchPercent: 74,
    competencyMatch: ["Data Pipelines", "SQL"],
    potential: "contributor",
  },
];

export const vkSimulator = {
  currentReadiness: 52,
  afterProgramReadiness: 84,
  currentTimelineMonths: 9,
  acceleratedTimelineMonths: 5,
};
