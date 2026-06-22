export interface YandexRole {
  role: string;
  speed: "fast" | "medium" | "slow";
  candidatesAvailable: number;
  requiredCompetencies: string[];
}

export const yandexProductIdeas = [
  "Запустить генеративный поиск в Яндекс Маркете",
  "AI-ассистент для Яндекс Практикума",
  "Персонализация ленты Дзен на базе LLM",
];

export const yandexRoles: YandexRole[] = [
  {
    role: "Product Lead",
    speed: "fast",
    candidatesAvailable: 5,
    requiredCompetencies: ["Product Strategy", "Experimentation"],
  },
  {
    role: "Research Engineer",
    speed: "medium",
    candidatesAvailable: 3,
    requiredCompetencies: ["LLM Research", "Evaluation Frameworks"],
  },
  {
    role: "Applied ML Engineer",
    speed: "fast",
    candidatesAvailable: 8,
    requiredCompetencies: ["Model Serving", "RAG Systems"],
  },
  {
    role: "Growth/Experimentation Lead",
    speed: "fast",
    candidatesAvailable: 6,
    requiredCompetencies: ["A/B Testing", "Funnel Analytics"],
  },
  {
    role: "AI Safety Reviewer",
    speed: "slow",
    candidatesAvailable: 2,
    requiredCompetencies: ["Responsible AI", "Red-teaming"],
  },
];
