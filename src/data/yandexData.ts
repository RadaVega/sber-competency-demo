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

// ---------------------------------------------------------------------------
// Knowledge Graph — the central object of the Yandex scenario. Not a
// dashboard: a living map of how research becomes products becomes new
// research. Every node type from the brief is represented.
// ---------------------------------------------------------------------------

export interface KGNode {
  id: string;
  label: string;
  type: "research" | "product" | "team" | "expert" | "competency" | "technology" | "ai";
}
export interface KGEdge { from: string; to: string }

export const knowledgeGraphNodes: KGNode[] = [
  { id: "r1", label: "Исследование: генеративный поиск", type: "research" },
  { id: "r2", label: "Эксперимент: голосовые интерфейсы", type: "research" },
  { id: "p1", label: "Яндекс Маркет: генеративный поиск", type: "product" },
  { id: "p2", label: "Дзен: LLM-персонализация", type: "product" },
  { id: "t1", label: "Команда генеративного поиска", type: "team" },
  { id: "t2", label: "Команда автономного транспорта", type: "team" },
  { id: "e1", label: "А. Ковалёва, LLM Research", type: "expert" },
  { id: "e2", label: "Д. Сорокин, RAG Systems", type: "expert" },
  { id: "c1", label: "RAG Systems", type: "competency" },
  { id: "c2", label: "Evaluation Frameworks", type: "competency" },
  { id: "tech1", label: "LLM Serving Infrastructure", type: "technology" },
  { id: "ai1", label: "AI Orchestrator", type: "ai" },
];

export const knowledgeGraphEdges: KGEdge[] = [
  { from: "r1", to: "p1" },
  { from: "p1", to: "t1" },
  { from: "t1", to: "e2" },
  { from: "e2", to: "c1" },
  { from: "c1", to: "tech1" },
  { from: "r2", to: "t2" },
  { from: "p2", to: "e1" },
  { from: "e1", to: "c2" },
  { from: "ai1", to: "r1" },
  { from: "ai1", to: "p2" },
  { from: "ai1", to: "t2" },
];

// ---------------------------------------------------------------------------
// Opportunity map (Scene 3) — competency gaps framed as a map of openings,
// not an HR shortage report. Dual-worded for VP vs Engineer perspective.
// ---------------------------------------------------------------------------

export interface OpportunityArea {
  domain: string;
  vpFraming: string;
  engineerFraming: string;
  duplication: string; // Scene 4: research happening twice without knowing
  maturity: number; // 0-100
}

export const opportunityAreas: OpportunityArea[] = [
  {
    domain: "Генеративный поиск",
    vpFraming: "3 команды параллельно исследуют одну и ту же RAG-архитектуру — дублирование исследований.",
    engineerFraming: "Если вы работаете с RAG — рядом уже есть команда с готовыми экспериментами, которые сэкономят вам месяц.",
    duplication: "Маркет, Поиск и Дзен независимо тестируют схожие RAG-пайплайны.",
    maturity: 62,
  },
  {
    domain: "Голосовые интерфейсы",
    vpFraming: "Критическая компетенция для нового направления — специалистов на всю компанию всего 4.",
    engineerFraming: "Одно из самых незанятых направлений прямо сейчас — шанс стать одним из первых экспертов.",
    duplication: "Дублирования нет — направление слишком новое, это и есть риск.",
    maturity: 28,
  },
  {
    domain: "Автономный транспорт",
    vpFraming: "Компетенции сконцентрированы в одной команде — риск при масштabировании на новые города.",
    engineerFraming: "Опытная команда готова делиться знаниями — редкая возможность учиться у практиков с реальными километрами пробега.",
    duplication: "Нет — но знания заперты внутри одной команды и не описаны нигде, кроме кода.",
    maturity: 71,
  },
  {
    domain: "Рекомендательные системы",
    vpFraming: "Зрелая компетенция, но эксперименты в Дзене и Маркете не обмениваются результатами.",
    engineerFraming: "Много опытных наставников, быстрый вход — но нужно специально искать пересечения между продуктами.",
    duplication: "Дзен и Маркет independently A/B-тестируют похожие модели ранжирования.",
    maturity: 84,
  },
];

// ---------------------------------------------------------------------------
// AI co-pilot during the project (Scene 6)
// ---------------------------------------------------------------------------

export const aiCopilotSuggestions = [
  { moment: "Неделя 1", suggestion: "Похожий эксперимент уже проводила команда Дзена в марте — вот их выводы и код." },
  { moment: "Неделя 3", suggestion: "Риск: похожая модель показала деградацию качества на длинных запросах. Учтите в тест-плане." },
  { moment: "Неделя 6", suggestion: "Есть свободный ML-инженер с опытом именно в этой архитектуре — предложить в команду?" },
  { moment: "Неделя 9", suggestion: "Пора зафиксировать методику — 2 другие команды планируют похожие эксперименты в следующем квартале." },
];

// ---------------------------------------------------------------------------
// Compounding intelligence (Scene 7) — the closing loop payoff
// ---------------------------------------------------------------------------

export const compoundingStats = {
  projectsCompleted: 340,
  knowledgeArtifactsReused: 1280,
  avgSpeedupForNextTeam: 38, // %
  activeKnowledgeGraphNodes: 4200,
};

export const compoundingExamples = [
  "Эксперимент команды генеративного поиска стал стартовой точкой для персонализации Дзена — 6 недель вместо 4 месяцев.",
  "Методика оценки RAG-систем, описанная во время одного проекта, теперь используется в 5 других командах.",
  "Новый инженер, пришедший в команду автономного транспорта, за первую неделю получил доступ к трём годам накопленных экспериментов.",
];
